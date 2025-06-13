"use client";
import { useEffect, useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import styles from "./page.module.css";
import Header from "../../components/Header";
import FilterSection from "./components/FilterSection";
import TabNavigation from "./components/TabNavigation";
import LoadingComponent from "./components/LoadingComponent";
import CompanyDataTable from "./components/CompanyDataTable";
import DataVisualizations from "./components/DataVisualizations";
import { CompanyDataProvider } from "../context/CompanyDataContext";

export default function Dataexplorer() {
  const [companies, setCompanies] = useState([]);
  const [companiesdata, setcompaniesdata] = useState([]);

  // Separate loading states
  const [initialLoading, setInitialLoading] = useState(true); // Only for first load
  const [dataLoading, setDataLoading] = useState(false); // For data tab
  const [chartsLoading, setChartsLoading] = useState(false); // For charts tab
  const [filterLoading, setFilterLoading] = useState(false); // For filter section

  const [activeTab, setActiveTab] = useState("data");
  const [selectedPage, setSelectedPage] = useState(1);
  const [company, setcompany] = useState(10);
  const [searchQuery, setSearchQuery] = useState("");
  const [hasFilterChanged, setHasFilterChanged] = useState(false);

  // Add filter state to parent component
  const [filters, setFilters] = useState({
    sector: [],
    country: [],
    scope: "",
    targetYear: [],
    searchTerm: "",
  });

  const [paginationData, setPaginationData] = useState({
    totalDocs: 0,
    totalPages: 0,
    currentPage: 1,
    currentLimit: 10,
  });

  const fetchCompanies = useCallback(
    async (isFilterChange = false) => {
      try {
        // Set appropriate loading state
        if (isFilterChange) {
          setFilterLoading(true);
          setDataLoading(true);
        } else {
          setInitialLoading(true);
        }

        const res = await fetch(
          `/api/getdata/paginated?page=${selectedPage}&limit=${company}&search=${searchQuery}`,
          {
            method: "GET",
          }
        );

        if (!res.ok) {
          throw new Error("Failed to fetch company data");
        }

        const data = await res.json();
        setCompanies(data.data);
        setPaginationData({
          totalDocs: data.totalDocs,
          totalPages: data.totalPages,
          currentPage: data.page,
          currentLimit: data.limit,
        });

        // Update state if API returns different page/limit (e.g., fallback to last page)
        if (data.page !== selectedPage) {
          setSelectedPage(data.page);
        }
      } catch (err) {
        console.error("Failed to load companies data:", err);
      } finally {
        if (isFilterChange) {
          setDataLoading(false);
        } else {
          setInitialLoading(false);
        }
      }
    },
    [selectedPage, company, searchQuery]
  );

  //this func will be for data tab
  const fetchdata = useCallback(
    async (isFilterChange = false) => {
      try {
        // Set appropriate loading state
        if (isFilterChange) {
          setChartsLoading(true);
        } else {
          setInitialLoading(true);
        }

        const res = await fetch(
          `/api/getdata/getsearchdata?&search=${searchQuery}`,
          {
            method: "GET",
          }
        );

        if (!res.ok) {
          throw new Error("Failed to fetch company data");
        }

        const data = await res.json();
        setcompaniesdata(data.data);
      } catch (err) {
        console.error("Failed to load companies data:", err);
      } finally {
        if (isFilterChange) {
          setChartsLoading(false);
          setFilterLoading(false); // Stop filter loading when charts are done
        } else {
          setInitialLoading(false);
        }
      }
    },
    [searchQuery]
  );

  // Initial data fetch
  useEffect(() => {
    const initialFetch = async () => {
      await Promise.all([fetchCompanies(false), fetchdata(false)]);
    };
    initialFetch();
  }, []);

  // Fetch data when searchQuery changes (filter applied or cleared)
  useEffect(() => {
    if (!initialLoading && hasFilterChanged) {
      const filterFetch = async () => {
        await Promise.all([fetchCompanies(true), fetchdata(true)]);
      };
      filterFetch();
      setHasFilterChanged(false); // Reset flag after fetching
    }
  }, [searchQuery, hasFilterChanged]);

  // Fetch only companies data when page/limit changes
  useEffect(() => {
    if (!initialLoading && !searchQuery) {
      fetchCompanies(false);
    } else if (!initialLoading && searchQuery) {
      fetchCompanies(true);
    }
  }, [selectedPage, company]);

  const handlePageChange = (newPage) => {
    setSelectedPage(newPage);
  };

  const handlelimit = (newLimit) => {
    setcompany(newLimit);

    const newTotalPages = Math.ceil(paginationData.totalDocs / newLimit) || 1;

    if (selectedPage > newTotalPages) {
      setSelectedPage(newTotalPages);
    }
  };

  // Updated to accept filters and query separately
  const handleFilterChange = useCallback((query, newFilters) => {
    setSearchQuery(query);
    setFilters(newFilters);
    setSelectedPage(1); // Reset to first page when filters change
    setHasFilterChanged(true); // Mark that filters have been changed by user
  }, []);

  // Only show full page loading on initial load
  if (initialLoading) {
    return (
      <>
        <Header />
        <div className={styles.container}>
          <LoadingComponent />
        </div>
      </>
    );
  }

  return (
    <>
      <CompanyDataProvider>
        <Header />
        <FilterSection
          onFilterChange={handleFilterChange}
          filters={filters}
          setFilters={setFilters}
          loading={filterLoading}
        />
        <div className={styles.container}>
          <motion.div
            className={styles.header}
            initial={{ opacity: 0, y: -30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <p className={styles.subtitle}>
              Explore {paginationData.totalDocs} companies and their Net Zero
              commitments
            </p>
          </motion.div>

          <TabNavigation activeTab={activeTab} onTabChange={setActiveTab} />

          <AnimatePresence mode="wait">
            {activeTab === "data" && (
              <motion.div
                key="data-tab"
                className={styles.tabContent}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -30 }}
                transition={{ duration: 0.6 }}
              >
                {dataLoading ? (
                  <LoadingComponent message="Updating company data..." />
                ) : (
                  <CompanyDataTable
                    companies={companies}
                    onpage={handlePageChange}
                    onlimit={handlelimit}
                    page={selectedPage}
                    limit={company}
                    paginationData={paginationData}
                  />
                )}
              </motion.div>
            )}

            {activeTab === "charts" && (
              <motion.div
                key="charts-tab"
                className={styles.tabContent}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -30 }}
                transition={{ duration: 0.6 }}
              >
                {chartsLoading ? (
                  <LoadingComponent message="Updating visualizations..." />
                ) : (
                  <DataVisualizations companies={companiesdata} />
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </CompanyDataProvider>
    </>
  );
}
