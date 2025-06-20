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
import { TbTargetArrow } from "react-icons/tb";
import { MdOutlineScience } from "react-icons/md";

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
                    <MdOutlineScience className={styles.fieldIcon} />
                    <div>
                      <label>Science-Based Targets(STBi)</label>
                      <span>{company.sciencebasedtargets}</span>
                    </div>
                  </div>

                  <div className={styles.modalField}>
                    <TbTargetArrow className={styles.fieldIcon} />
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

export default CompanyModal;
