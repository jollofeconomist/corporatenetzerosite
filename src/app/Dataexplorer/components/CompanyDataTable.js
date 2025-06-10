"use client";
import { useState, useMemo, useCallback, memo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  FiEye,
  FiX,
  FiGlobe,
  FiTarget,
  FiCalendar,
  FiDollarSign,
  FiMapPin,
  FiLayers,
  FiChevronLeft,
  FiChevronRight,
} from "react-icons/fi";
import { FaBuilding } from "react-icons/fa";
import styles from "./CompanyDataTable.module.css";

// Memoized Company Row Component for Performance
const CompanyRow = memo(({ company, onViewMore, index }) => {
  return (
    <motion.tr
      className={styles.tableRow}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: index * 0.05 }}
      whileHover={{ backgroundColor: "rgba(34, 197, 94, 0.05)" }}
    >
      <td className={styles.tableCell}>
        <div className={styles.companyInfo}>
          <FaBuilding className={styles.companyIcon} />
          <span className={styles.companyName}>{company.companyName}</span>
        </div>
      </td>
      <td className={styles.tableCell}>
        <div className={styles.countryInfo}>
          <FiMapPin className={styles.countryIcon} />
          <span>{company.country}</span>
        </div>
      </td>
      <td className={styles.tableCell}>
        <div className={styles.targetInfo}>
          {company.netzero ? (
            <>
              <FiTarget className={styles.targetIcon} />
              <span className={styles.targetYear}>
                {company.targetyear || "N/A"}
              </span>
            </>
          ) : (
            <span className={styles.noTarget}>No Target</span>
          )}
        </div>
      </td>
      <td className={styles.tableCell}>
        <motion.button
          className={styles.viewMoreButton}
          onClick={() => onViewMore(company)}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <FiEye />
          View More
        </motion.button>
      </td>
    </motion.tr>
  );
});

// Memoized Modal Component
const CompanyModal = memo(({ company, isOpen, onClose }) => {
  const modalVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: { opacity: 1, scale: 1 },
    exit: { opacity: 0, scale: 0.8 },
  };

  const overlayVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
    exit: { opacity: 0 },
  };

  if (!company) return null;

  return (
    <>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className={styles.modalOverlay}
            variants={overlayVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            onClick={onClose}
          >
            <motion.div
              className={styles.modal}
              variants={modalVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              onClick={(e) => e.stopPropagation()}
            >
              <div className={styles.modalHeader}>
                <h2 className={styles.modalTitle}>
                  <FaBuilding />
                  {company.companyName}
                </h2>
                <motion.button
                  className={styles.closeButton}
                  onClick={onClose}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <FiX />
                </motion.button>
              </div>

              <div className={styles.modalContent}>
                <div className={styles.modalGrid}>
                  <div className={styles.modalField}>
                    <FiLayers className={styles.fieldIcon} />
                    <div>
                      <label>Sector</label>
                      <span>{company.sector}</span>
                    </div>
                  </div>

                  <div className={styles.modalField}>
                    <FiMapPin className={styles.fieldIcon} />
                    <div>
                      <label>Country</label>
                      <span>{company.country}</span>
                    </div>
                  </div>

                  <div className={styles.modalField}>
                    <FiGlobe className={styles.fieldIcon} />
                    <div>
                      <label>Continent</label>
                      <span>{company.continent}</span>
                    </div>
                  </div>

                  <div className={styles.modalField}>
                    <FiTarget className={styles.fieldIcon} />
                    <div>
                      <label>Net Zero Target</label>
                      <span
                        className={
                          company.netzero ? styles.hasTarget : styles.noTarget
                        }
                      >
                        {company.netzero ? "Yes" : "No"}
                      </span>
                    </div>
                  </div>

                  {company.netzero && (
                    <>
                      <div className={styles.modalField}>
                        <FiCalendar className={styles.fieldIcon} />
                        <div>
                          <label>Target Year</label>
                          <span>{company.targetyear || "Not specified"}</span>
                        </div>
                      </div>

                      <div className={styles.modalField}>
                        <FiLayers className={styles.fieldIcon} />
                        <div>
                          <label>Scope</label>
                          <span>{company.scope || "Not specified"}</span>
                        </div>
                      </div>
                    </>
                  )}

                  <div className={styles.modalField}>
                    <FiDollarSign className={styles.fieldIcon} />
                    <div>
                      <label>Annual Revenue</label>
                      <span>
                        {company.companyyearrevenue
                          ? `$${Number(
                              company.companyyearrevenue
                            ).toLocaleString()}`
                          : "Not disclosed"}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
});

export default function CompanyDataTable({
  companies,
  onpage,
  onlimit,
  page,
  limit,
  paginationData,
}) {
  const [selectedCompany, setSelectedCompany] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleViewMore = useCallback((company) => {
    setSelectedCompany(company);
    setIsModalOpen(true);
  }, []);

  const handleCloseModal = useCallback(() => {
    setIsModalOpen(false);
    setSelectedCompany(null);
  }, []);

  const handleLimitChange = useCallback(
    (newLimit) => {
      onlimit(newLimit);
    },
    [onlimit]
  );

  const companyRows = useMemo(() => {
    return companies.map((company, index) => (
      <CompanyRow
        key={company._id || index}
        company={company}
        onViewMore={handleViewMore}
        index={index}
      />
    ));
  }, [companies, handleViewMore]);

  const limitOptions = [10, 20, 30, 50, 100];

  return (
    <>
      <div className={styles.tableContainer}>
        <table className={styles.table}>
          <thead>
            <tr className={styles.tableHeader}>
              <th className={styles.tableHeaderCell}>
                <FaBuilding />
                Company Name
              </th>
              <th className={styles.tableHeaderCell}>
                <FiMapPin />
                Country
              </th>
              <th className={styles.tableHeaderCell}>
                <FiTarget />
                Net Zero Target Year
              </th>
              <th className={styles.tableHeaderCell}>Actions</th>
            </tr>
          </thead>
          <tbody>{companyRows}</tbody>
        </table>
      </div>

      <div className={styles.paginationContainer}>
        <div className={styles.paginationGroup}>
          <label className={styles.paginationLabel}>Companies per page:</label>
          <select
            className={styles.paginationSelect}
            value={limit}
            onChange={(e) => handleLimitChange(Number(e.target.value))}
          >
            {limitOptions.map((limitNum) => (
              <option key={limitNum} value={limitNum}>
                {limitNum}
              </option>
            ))}
          </select>
        </div>

        <div className={styles.pageNavigation}>
          <motion.button
            className={styles.pageNavButton}
            onClick={() => onpage(page - 1)}
            disabled={page <= 1}
            whileHover={{ scale: page > 1 ? 1.05 : 1 }}
            whileTap={{ scale: page > 1 ? 0.95 : 1 }}
            title="Previous page"
          >
            <FiChevronLeft />
          </motion.button>

          <div className={styles.pageInfo}>
            <span className={styles.currentPage}>
              Page {page} of {paginationData?.totalPages || 1}
            </span>
          </div>

          <motion.button
            className={styles.pageNavButton}
            onClick={() => onpage(page + 1)}
            disabled={page >= (paginationData?.totalPages || 1)}
            whileHover={{
              scale: page < (paginationData?.totalPages || 1) ? 1.05 : 1,
            }}
            whileTap={{
              scale: page < (paginationData?.totalPages || 1) ? 0.95 : 1,
            }}
            title="Next page"
          >
            <FiChevronRight />
          </motion.button>
        </div>
      </div>

      {/* Page Change Notification */}

      <CompanyModal
        company={selectedCompany}
        isOpen={isModalOpen}
        onClose={handleCloseModal}
      />
    </>
  );
}
