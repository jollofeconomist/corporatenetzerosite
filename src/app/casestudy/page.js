"use client";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from "next/navigation";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import {
  FiPlus,
  FiSearch,
  FiFilter,
  FiCalendar,
  FiDollarSign,
  FiGlobe,
  FiEye,
  FiFileText,
  FiUsers,
  FiTrendingUp,
  FiMapPin,
} from "react-icons/fi";
import { FaBuilding } from "react-icons/fa";
import styles from "./page.module.css";

export default function CaseStudyPage() {
  const router = useRouter();
  const [caseStudies, setCaseStudies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterIndustry, setFilterIndustry] = useState("");
  const [selectedCaseStudy, setSelectedCaseStudy] = useState(null);

  const fetchCaseStudies = async () => {
    try {
      setLoading(true);
      const response = await fetch("/api/getcasestudy", {
        method: "GET",
      });
      if (!response.ok) {
        throw new Error("Failed to fetch case studies");
      }
      const data = await response.json();
      setCaseStudies(data.caseStudies || []);
    } catch (error) {
      console.error("Error fetching case studies:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCaseStudies();
  }, []);

  // Filter case studies based on search and industry filter
  const filteredCaseStudies = caseStudies.filter((caseStudy) => {
    const matchesSearch =
      caseStudy.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      caseStudy.company?.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesIndustry =
      !filterIndustry || caseStudy.industry === filterIndustry;
    return matchesSearch && matchesIndustry;
  });

  // Get unique industries for filter
  const industries = [
    ...new Set(caseStudies.map((cs) => cs.industry).filter(Boolean)),
  ];

  const formatRevenue = (revenue) => {
    if (!revenue) return "Not disclosed";
    return revenue;
  };

  const formatWebsite = (website) => {
    if (!website) return null;
    return website.startsWith("http") ? website : `https://${website}`;
  };

  return (
    <>
      <Header />
      <div className={styles.caseStudyPage}>
        <div className={styles.container}>
          {/* Header Section */}
          <motion.div
            className={styles.header}
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className={styles.headerContent}>
              <div className={styles.headerText}>
                <h1 className={styles.title}>Net Zero Case Studies</h1>
                <p className={styles.subtitle}>
                  Explore corporate sustainability success stories and
                  initiatives from leading food industry companies
                </p>
              </div>
            </div>

            {/* Stats Row */}
            <div className={styles.statsRow}>
              <div className={styles.statCard}>
                <FiFileText className={styles.statIcon} />
                <div>
                  <div className={styles.statNumber}>{caseStudies.length}</div>
                  <div className={styles.statLabel}>Case Studies</div>
                </div>
              </div>
              <div className={styles.statCard}>
                <FaBuilding className={styles.statIcon} />
                <div>
                  <div className={styles.statNumber}>
                    {new Set(caseStudies.map((cs) => cs.company)).size}
                  </div>
                  <div className={styles.statLabel}>Companies</div>
                </div>
              </div>
              <div className={styles.statCard}>
                <FiUsers className={styles.statIcon} />
                <div>
                  <div className={styles.statNumber}>{industries.length}</div>
                  <div className={styles.statLabel}>Industries</div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Search and Filter Section */}
          <motion.div
            className={styles.filterSection}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <div className={styles.searchBox}>
              <FiSearch className={styles.searchIcon} />
              <input
                type="text"
                placeholder="Search case studies by title or company..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className={styles.searchInput}
              />
            </div>
            <div className={styles.filterBox}>
              <FiFilter className={styles.filterIcon} />
              <select
                value={filterIndustry}
                onChange={(e) => setFilterIndustry(e.target.value)}
                className={styles.filterSelect}
              >
                <option value="">All Industries</option>
                {industries.map((industry) => (
                  <option key={industry} value={industry}>
                    {industry}
                  </option>
                ))}
              </select>
            </div>
          </motion.div>

          {/* Case Studies Grid */}
          <div className={styles.contentSection}>
            {loading ? (
              <div className={styles.loadingContainer}>
                <div className={styles.loader}></div>
                <p>Loading case studies...</p>
              </div>
            ) : filteredCaseStudies.length > 0 ? (
              <motion.div
                className={styles.caseStudiesGrid}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.4 }}
              >
                <AnimatePresence>
                  {filteredCaseStudies.map((caseStudy, index) => (
                    <motion.div
                      key={caseStudy._id}
                      className={styles.caseStudyCard}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                      transition={{ duration: 0.4, delay: index * 0.1 }}
                      whileHover={{ y: -5, scale: 1.02 }}
                      onClick={() => setSelectedCaseStudy(caseStudy)}
                    >
                      <div className={styles.cardHeader}>
                        <div className={styles.industryBadge}>
                          {caseStudy.industry || "Other"}
                        </div>
                        <div className={styles.yearBadge}>
                          <FiCalendar />
                          {caseStudy.year}
                        </div>
                      </div>

                      <div className={styles.cardContent}>
                        <h3 className={styles.cardTitle}>{caseStudy.title}</h3>
                        <div className={styles.companyInfo}>
                          <FaBuilding className={styles.infoIcon} />
                          <span>{caseStudy.company}</span>
                        </div>

                        {caseStudy.revenue && (
                          <div className={styles.revenueInfo}>
                            <FiDollarSign className={styles.infoIcon} />
                            <span>{formatRevenue(caseStudy.revenue)}</span>
                          </div>
                        )}

                        <div className={styles.sectionsPreview}>
                          <span className={styles.sectionsCount}>
                            {caseStudy.sections?.length || 0} sections
                          </span>
                        </div>
                      </div>

                      <div className={styles.cardFooter}>
                        <div className={styles.websiteLink}>
                          {caseStudy.website && (
                            <a
                              href={formatWebsite(caseStudy.website)}
                              target="_blank"
                              rel="noopener noreferrer"
                              onClick={(e) => e.stopPropagation()}
                              className={styles.websiteButton}
                            >
                              <FiGlobe />
                              Visit Website
                            </a>
                          )}
                        </div>
                        <button className={styles.viewButton}>
                          <FiEye />
                          View Details
                        </button>
                      </div>
                    </motion.div>
                  ))}
                </AnimatePresence>
              </motion.div>
            ) : (
              <motion.div
                className={styles.emptyState}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
              >
                <FiFileText className={styles.emptyIcon} />
                <h3>No Case Studies Found</h3>
                <p>
                  {searchTerm || filterIndustry
                    ? "Try adjusting your search or filter criteria"
                    : "Be the first to create a case study"}
                </p>
                <motion.button
                  className={styles.createButton}
                  onClick={handleCreateNew}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <FiPlus />
                  Create First Case Study
                </motion.button>
              </motion.div>
            )}
          </div>

          {/* Modal for detailed view */}
          <AnimatePresence>
            {selectedCaseStudy && (
              <motion.div
                className={styles.modalOverlay}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setSelectedCaseStudy(null)}
              >
                <motion.div
                  className={styles.modalContent}
                  initial={{ opacity: 0, scale: 0.9, y: 20 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.9, y: 20 }}
                  onClick={(e) => e.stopPropagation()}
                >
                  <div className={styles.modalHeader}>
                    <div>
                      <h2 className={styles.modalTitle}>
                        {selectedCaseStudy.title}
                      </h2>
                      <div className={styles.modalSubtitle}>
                        <FaBuilding />
                        {selectedCaseStudy.company} •{" "}
                        {selectedCaseStudy.industry} • {selectedCaseStudy.year}
                      </div>
                    </div>
                    <button
                      className={styles.closeButton}
                      onClick={() => setSelectedCaseStudy(null)}
                    >
                      ×
                    </button>
                  </div>

                  <div className={styles.modalBody}>
                    <div className={styles.modalInfo}>
                      {selectedCaseStudy.revenue && (
                        <div className={styles.infoItem}>
                          <FiDollarSign />
                          <span>
                            Revenue: {formatRevenue(selectedCaseStudy.revenue)}
                          </span>
                        </div>
                      )}
                      {selectedCaseStudy.website && (
                        <div className={styles.infoItem}>
                          <FiGlobe />
                          <a
                            href={formatWebsite(selectedCaseStudy.website)}
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            {selectedCaseStudy.website}
                          </a>
                        </div>
                      )}
                    </div>

                    <div className={styles.sectionsContent}>
                      {selectedCaseStudy.sections?.map((section, index) => (
                        <div key={index} className={styles.section}>
                          <h3 className={styles.sectionHeading}>
                            {section.heading}
                          </h3>
                          <div className={styles.sectionContent}>
                            {Array.isArray(section.content) ? (
                              section.content.map((paragraph, pIndex) => (
                                <p key={pIndex} className={styles.paragraph}>
                                  {paragraph}
                                </p>
                              ))
                            ) : (
                              <p className={styles.paragraph}>
                                {section.content}
                              </p>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
      <Footer />
    </>
  );
}
