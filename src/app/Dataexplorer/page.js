"use client";
import { useEffect, useState, useCallback, memo, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  FiGlobe,
  FiTarget,
  FiDatabase,
  FiTrendingUp,
  FiBarChart,
  FiChevronDown,
  FiX,
} from "react-icons/fi";
import { TfiBarChart } from "react-icons/tfi";
import styles from "./page.module.css";
import CompanyDataTable from "./components/CompanyDataTable";
import DataVisualizations from "./components/DataVisualizations";
import Header from "../../components/Header";

// Hero Section Component
const HeroSection = memo(() => {
  const [filters, setFilters] = useState({
    sector: [],
    country: [],
    scope: "",
    targetYear: [],
    searchTerm: "",
  });

  // Sample data for dropdowns (will be replaced with API data later)
  const sectors = [
    "Food & Beverage",
    "Agriculture",
    "Retail",
    "Manufacturing",
    "Packaging",
    "Technology",
  ];

  const countries = [
    "United States",
    "United Kingdom",
    "Germany",
    "France",
    "Netherlands",
    "Canada",
    "Australia",
    "Japan",
    "Switzerland",
    "Sweden",
  ];

  const scopes = [
    "Scope 1",
    "Scope 2",
    "Scope 3",
    "Scope 1 & 2",
    "Scope 1, 2 & 3",
  ];

  const targetYears = ["2025", "2030", "2035", "2040", "2045", "2050"];

  const [dropdownStates, setDropdownStates] = useState({
    sector: false,
    country: false,
    targetYear: false,
  });

  const toggleDropdown = (filterType) => {
    setDropdownStates((prev) => {
      // Close all dropdowns first
      const newStates = {
        sector: false,
        country: false,
        targetYear: false,
      };
      // Then toggle the specific dropdown
      newStates[filterType] = !prev[filterType];
      return newStates;
    });
  };

  const closeAllDropdowns = () => {
    setDropdownStates({
      sector: false,
      country: false,
      targetYear: false,
    });
  };

  const filterContainerRef = useRef(null);

  // Handle clicks outside dropdown to close them
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        filterContainerRef.current &&
        !filterContainerRef.current.contains(event.target)
      ) {
        closeAllDropdowns();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const removeMultiSelectItem = (filterType, value) => {
    setFilters((prev) => {
      const currentValues = prev[filterType] || [];
      const newValues = currentValues.filter((item) => item !== value);

      return {
        ...prev,
        [filterType]: newValues,
      };
    });
  };

  const renderMultiSelectDropdown = (filterType, options, icon, label) => {
    const selectedValues = filters[filterType] || [];
    const isOpen = dropdownStates[filterType];

    return (
      <div className={styles.filterGroup}>
        <label className={styles.filterLabel}>
          {icon}
          {label}
        </label>
        <div className={styles.multiSelectContainer}>
          <div
            className={styles.multiSelectTrigger}
            onClick={(e) => {
              e.stopPropagation();
              toggleDropdown(filterType);
            }}
          >
            <div className={styles.selectedValues}>
              {selectedValues.length === 0 ? (
                <span className={styles.placeholder}>All {label}s</span>
              ) : selectedValues.length === 1 ? (
                <span>{selectedValues[0]}</span>
              ) : (
                <span>{selectedValues.length} selected</span>
              )}
            </div>
            <FiChevronDown
              className={`${styles.chevron} ${
                isOpen ? styles.chevronOpen : ""
              }`}
            />
          </div>

          {isOpen && (
            <motion.div
              className={styles.multiSelectDropdown}
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.2 }}
            >
              {options.map((option) => (
                <div
                  key={option}
                  className={`${styles.multiSelectOption} ${
                    selectedValues.includes(option)
                      ? styles.multiSelectOptionSelected
                      : ""
                  }`}
                  onClick={(e) => {
                    e.stopPropagation();
                    handleMultiSelectChange(filterType, option);
                  }}
                >
                  <input
                    type="checkbox"
                    checked={selectedValues.includes(option)}
                    readOnly
                    className={styles.checkbox}
                  />
                  <span>{option}</span>
                </div>
              ))}
            </motion.div>
          )}
        </div>

        {selectedValues.length > 0 && (
          <div className={styles.selectedTags}>
            {selectedValues.map((value) => (
              <span key={value} className={styles.selectedTag}>
                {value}
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    removeMultiSelectItem(filterType, value);
                  }}
                  className={styles.removeTag}
                >
                  <FiX />
                </button>
              </span>
            ))}
          </div>
        )}
      </div>
    );
  };

  const handleFilterChange = (filterType, value) => {
    setFilters((prev) => ({
      ...prev,
      [filterType]: value,
    }));
  };

  const handleMultiSelectChange = (filterType, value) => {
    setFilters((prev) => {
      const currentValues = prev[filterType] || [];
      const newValues = currentValues.includes(value)
        ? currentValues.filter((item) => item !== value)
        : [...currentValues, value];

      return {
        ...prev,
        [filterType]: newValues,
      };
    });
  };

  const clearFilters = () => {
    setFilters({
      sector: [],
      country: [],
      scope: "",
      targetYear: [],
      searchTerm: "",
    });
  };

  const applyFilters = () => {
    // This will be implemented when API integration is added
    console.log("Applying filters:", filters);
  };

  return (
    <div className={styles.heroSection}>
      <div className={styles.heroOverlay} />
      <div className={styles.heroImageContainer}>
        <img
          src="/asset/img4.jpg"
          alt="Corporate sustainability and Net Zero goals"
          className={styles.heroImage}
        />
      </div>
      <motion.div
        className={styles.heroContent}
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.3 }}
      >
        <div className={styles.filterContainer} ref={filterContainerRef}>
          <motion.div
            className={styles.filterHeader}
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <h1 className={styles.filterTitle}>
              <FiDatabase className={styles.filterTitleIcon} />
              Filter Corporate Data
            </h1>
            <p className={styles.filterDescription}>
              Find companies by sector, location, emission scope, and Net Zero
              target year
            </p>
          </motion.div>

          <motion.div
            className={styles.searchSection}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
          >
            <div className={styles.searchInputContainer}>
              <FiGlobe className={styles.searchIcon} />
              <input
                type="text"
                placeholder="Search companies..."
                value={filters.searchTerm}
                onChange={(e) =>
                  handleFilterChange("searchTerm", e.target.value)
                }
                className={styles.searchInput}
              />
            </div>
          </motion.div>

          <motion.div
            className={styles.filterGrid}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.8 }}
          >
            {renderMultiSelectDropdown(
              "sector",
              sectors,
              <FiTrendingUp className={styles.filterIcon} />,
              "Sector"
            )}
            {renderMultiSelectDropdown(
              "country",
              countries,
              <FiGlobe className={styles.filterIcon} />,
              "Country"
            )}

            <div className={styles.filterGroup}>
              <label className={styles.filterLabel}>
                <FiBarChart className={styles.filterIcon} />
                Emission Scope
              </label>
              <select
                value={filters.scope}
                onChange={(e) => handleFilterChange("scope", e.target.value)}
                className={styles.filterSelect}
              >
                <option value="">All Scopes</option>
                {scopes.map((scope) => (
                  <option key={scope} value={scope}>
                    {scope}
                  </option>
                ))}
              </select>
            </div>

            {renderMultiSelectDropdown(
              "targetYear",
              targetYears,
              <FiTarget className={styles.filterIcon} />,
              "Target Year"
            )}
          </motion.div>

          <motion.div
            className={styles.filterActions}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 1.0 }}
          >
            <button onClick={applyFilters} className={styles.applyButton}>
              <FiDatabase />
              Apply Filters
            </button>
            <button onClick={clearFilters} className={styles.clearButton}>
              Clear All
            </button>
          </motion.div>

          {/* <motion.div
            className={styles.filterSummary}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 1.2 }}
          >
            {/* <div className={styles.activeFilters}>
              {Object.entries(filters).map(([key, value]) => {
                if (key === "searchTerm" && value) {
                  return (
                    <span key={key} className={styles.filterTag}>
                      Search: {value}
                      <button
                        onClick={() => handleFilterChange("searchTerm", "")}
                        className={styles.removeFilterTag}
                      >
                        ×
                      </button>
                    </span>
                  );
                } else if (Array.isArray(value) && value.length > 0) {
                  return value.map((item) => (
                    <span key={`${key}-${item}`} className={styles.filterTag}>
                      {key}: {item}
                      <button
                        onClick={() => removeMultiSelectItem(key, item)}
                        className={styles.removeFilterTag}
                      >
                        ×
                      </button>
                    </span>
                  ));
                } else if (value && !Array.isArray(value)) {
                  return (
                    <span key={key} className={styles.filterTag}>
                      {key}: {value}
                      <button
                        onClick={() => handleFilterChange(key, "")}
                        className={styles.removeFilterTag}
                      >
                        ×
                      </button>
                    </span>
                  );
                }
                return null;
              })}
            </div> */}
          {/* </motion.div> */}
        </div>
      </motion.div>
    </div>
  );
});

// Tab Navigation Component
const TabNavigation = memo(({ activeTab, onTabChange }) => {
  const tabs = [
    { id: "data", label: "Company Data", icon: FiDatabase },
    { id: "charts", label: "Visualizations", icon: TfiBarChart },
  ];

  return (
    <div className={styles.tabNavigation}>
      {tabs.map((tab) => (
        <motion.button
          key={tab.id}
          className={`${styles.tabButton} ${
            activeTab === tab.id ? styles.tabButtonActive : ""
          }`}
          onClick={() => onTabChange(tab.id)}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          <tab.icon />
          {tab.label}
        </motion.button>
      ))}
    </div>
  );
});

export default function Dataexplorer() {
  const [companies, setCompanies] = useState([]);
  const [companiesdata, setcompaniesdata] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("data");
  const [selectedPage, setSelectedPage] = useState(1);
  const [company, setcompany] = useState(10);
  const [paginationData, setPaginationData] = useState({
    totalDocs: 0,
    totalPages: 0,
    currentPage: 1,
    currentLimit: 10,
  });

  const fetchCompanies = useCallback(async () => {
    try {
      setLoading(true);
      const res = await fetch(
        `/api/getdata/paginated?page=${selectedPage}&limit=${company}`,
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
      setLoading(false);
    }
  }, [selectedPage, company]);

  //this func will be for data tab

  const fetchdata = useCallback(async () => {
    try {
      setLoading(true);
      const res = await fetch(`/api/getdata/getsearchdata`, {
        method: "GET",
      });

      if (!res.ok) {
        throw new Error("Failed to fetch company data");
      }

      const data = await res.json();
      setcompaniesdata(data.data);
    } catch (err) {
      console.error("Failed to load companies data:", err);
    } finally {
      setLoading(false);
    }
  }, [company]);

  useEffect(() => {
    fetchCompanies();
    fetchdata();
  }, [fetchCompanies, fetchdata]);

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

  if (loading) {
    return (
      <>
        <Header />
        <div className={styles.container}>
          <div className={styles.loadingContainer}>
            <motion.div
              className={styles.loader}
              animate={{ rotate: 360 }}
              transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
            >
              <FiTarget />
            </motion.div>
            <p>Loading company data...</p>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <Header />
      <HeroSection />
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
              <CompanyDataTable
                companies={companies}
                onpage={handlePageChange}
                onlimit={handlelimit}
                page={selectedPage}
                limit={company}
                paginationData={paginationData}
              />
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
              <DataVisualizations companies={companiesdata} />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </>
  );
}
