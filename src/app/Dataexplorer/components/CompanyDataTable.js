"use client";
import { useState, useMemo, useCallback, memo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  FiEye,
  FiX,
  FiGlobe,
  FiCalendar,
  FiDollarSign,
  FiMapPin,
  FiLayers,
  FiChevronLeft,
  FiChevronRight,
} from "react-icons/fi";
import { FaBuilding } from "react-icons/fa";
import styles from "./CompanyDataTable.module.css";
import CompanyModal from "./CompanyModal";
import { TbTargetArrow } from "react-icons/tb";

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
              <TbTargetArrow className={styles.targetIcon} />
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
//<CompanyModal company={company} isOpen={isOpen} onClose={onClose} />;
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
                <TbTargetArrow />
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

      <CompanyModal
        company={selectedCompany}
        isOpen={isModalOpen}
        onClose={handleCloseModal}
      />
    </>
  );
}
