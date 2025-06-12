"use client";
import { useState, useCallback, memo, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import {
  FiGlobe,
  FiTarget,
  FiDatabase,
  FiTrendingUp,
  FiBarChart,
  FiChevronDown,
  FiX,
  FiLoader,
} from "react-icons/fi";
import styles from "./FilterSection.module.css";

const FilterSection = memo(
  ({ onFilterChange, filters, setFilters, loading = false }) => {
    // Sample data for dropdowns (will be replaced with API data later)
    const sectors = [
      "Other Sectors",
      "Food and Beverage",
      "Animal Protein",
      "Agricultural Input",
      "Animal product and Commmodity",
      "Restaurant and Food Services",
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

    const scopes = ["1", "2", "3", "1,2", "1,2,3"];

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
      const currentValues = filters[filterType] || [];
      const newValues = currentValues.filter((item) => item !== value);

      const newFilters = {
        ...filters,
        [filterType]: newValues,
      };
      setFilters(newFilters);
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
      const newFilters = {
        ...filters,
        [filterType]: value,
      };
      setFilters(newFilters);
    };

    const handleMultiSelectChange = (filterType, value) => {
      const currentValues = filters[filterType] || [];
      const newValues = currentValues.includes(value)
        ? currentValues.filter((item) => item !== value)
        : [...currentValues, value];

      const newFilters = {
        ...filters,
        [filterType]: newValues,
      };
      setFilters(newFilters);
    };

    const clearFilters = () => {
      const newFilters = {
        sector: [],
        country: [],
        scope: "",
        targetYear: [],
        searchTerm: "",
      };
      setFilters(newFilters);
      const query = buildSearchQuery(newFilters);
      onFilterChange(query, newFilters);
    };

    const buildSearchQuery = (filters) => {
      const entries = [];
      if (filters.sector.length)
        entries.push(`sector:${filters.sector.join(",")}`);
      if (filters.country.length)
        entries.push(`country:${filters.country.join(",")}`);
      if (filters.scope) {
        if (Array.isArray(filters.scope)) {
          if (filters.scope.length) {
            entries.push(`scope:${filters.scope.join(",")}`);
          }
        } else if (
          typeof filters.scope === "string" &&
          filters.scope.trim() !== ""
        ) {
          entries.push(`scope:${filters.scope}`);
        }
      }
      if (filters.targetYear.length)
        entries.push(`targetyear:${filters.targetYear.join(",")}`);
      if (filters.searchTerm && filters.searchTerm.trim())
        entries.push(`searchterm:${filters.searchTerm.trim()}`);
      return entries.join("|");
    };

    const applyFilters = () => {
      const query = buildSearchQuery(filters);
      onFilterChange(query, filters);
      console.log("Applying filters:", query);
      console.log("Current filters state:", filters);
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
                  value={filters.searchTerm || ""}
                  onChange={(e) =>
                    handleFilterChange("searchTerm", e.target.value)
                  }
                  className={styles.searchInput}
                  disabled={loading}
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
                  value={filters.scope || ""}
                  onChange={(e) => handleFilterChange("scope", e.target.value)}
                  className={styles.filterSelect}
                  disabled={loading}
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
              <button
                onClick={applyFilters}
                className={`${styles.applyButton} ${
                  loading ? styles.loading : ""
                }`}
                disabled={loading}
              >
                {loading ? (
                  <>
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{
                        duration: 1,
                        repeat: Infinity,
                        ease: "linear",
                      }}
                    >
                      <FiLoader />
                    </motion.div>
                    Applying...
                  </>
                ) : (
                  <>
                    <FiDatabase />
                    Apply Filters
                  </>
                )}
              </button>
              <button
                onClick={clearFilters}
                className={styles.clearButton}
                disabled={loading}
              >
                Clear All
              </button>
            </motion.div>
          </div>
        </motion.div>
      </div>
    );
  }
);

FilterSection.displayName = "FilterSection";

export default FilterSection;
