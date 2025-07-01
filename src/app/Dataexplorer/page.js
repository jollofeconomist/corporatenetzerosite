"use client";
import { useEffect, useState, useCallback, useRef } from "react";
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

  const [initialLoading, setInitialLoading] = useState(true);
  const [dataLoading, setDataLoading] = useState(false);
  const [chartsLoading, setChartsLoading] = useState(false);
  const [filterLoading, setFilterLoading] = useState(false);

  const [activeTab, setActiveTab] = useState("data");
  const [selectedPage, setSelectedPage] = useState(1);
  const [company, setcompany] = useState(10);
  const [searchQuery, setSearchQuery] = useState("");

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

  // Use ref to track if initial load is complete
  const isInitializedRef = useRef(false);

  // Simplified fetchCompanies - removed circular dependency
  const fetchCompanies = useCallback(async (page, limit, search) => {
    try {
      setDataLoading(true);

      const res = await fetch(
        `/api/getdata/paginated?page=${page}&limit=${limit}&search=${search}`,
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

      return data;
    } catch (err) {
      console.error("Failed to load companies data:", err);
      throw err;
    } finally {
      setDataLoading(false);
    }
  }, []);

  const fetchdata = useCallback(async (search) => {
    try {
      setChartsLoading(true);

      const res = await fetch(`/api/getdata/getsearchdata?&search=${search}`, {
        method: "GET",
      });

      if (!res.ok) {
        throw new Error("Failed to fetch company data");
      }

      const data = await res.json();
      setcompaniesdata(data.data);
      return data;
    } catch (err) {
      console.error("Failed to load companies data:", err);
      throw err;
    } finally {
      setChartsLoading(false);
    }
  }, []);

  useEffect(() => {
    const initialFetch = async () => {
      try {
        setInitialLoading(true);
        await Promise.all([fetchCompanies(1, 10, ""), fetchdata("")]);
        isInitializedRef.current = true;
      } catch (error) {
        console.error("Initial fetch failed:", error);
      } finally {
        setInitialLoading(false);
      }
    };

    initialFetch();
  }, []);

  // Handle pagination changes
  useEffect(() => {
    if (isInitializedRef.current) {
      fetchCompanies(selectedPage, company, searchQuery);
    }
  }, [selectedPage, company, fetchCompanies, searchQuery]);

  // Handle search changes - fetch both datasets
  useEffect(() => {
    if (isInitializedRef.current) {
      setFilterLoading(true);
      Promise.all([
        fetchCompanies(selectedPage, company, searchQuery),
        fetchdata(searchQuery),
      ]).finally(() => {
        setFilterLoading(false);
      });
    }
  }, [searchQuery]);

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
