"use client";
import Image from "next/image";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";

import {
  FiBarChart,
  FiPieChart,
  FiTrendingUp,
  FiCalendar,
} from "react-icons/fi";
import styles from "./DataInsights.module.css";
import { useCompanyData } from "../app/context/CompanyDataContext";
import React from "react";

function DataInsights() {
  const router = useRouter();

  const {
    loading,
    error,
    totalsectors,
    medianTargetYear,
    totalcountries,
    minyear,
    lastyear,
    sectorCounts,
    totalCompanies,
  } = useCompanyData();
  // const insights = [
  //   {
  //     icon: <FiBarChart />,
  //     title: "Sector Analysis",
  //     value: "8 Sectors",
  //     description: "From Agricultural Input to Animal Protein industries",
  //     trend: "+12% this year",
  //   },
  //   {
  //     icon: <FiPieChart />,
  //     title: "Regional Distribution",
  //     value: "45 Countries",
  //     description: "Across 6 continents with comprehensive coverage",
  //     trend: "Global reach",
  //   },
  //   {
  //     icon: <FiTrendingUp />,
  //     title: "Progress Rate",
  //     value: "85%",
  //     description: "Companies showing measurable progress",
  //     trend: "+5% monthly",
  //   },
  //   {
  //     icon: <FiCalendar />,
  //     title: "Target Years",
  //     value: "2025-2050",
  //     description: "Range of Net Zero commitment dates",
  //     trend: "2030 median",
  //   },
  // ];

  function getPercentage(s) {
    const count = sectorCounts[s] || 0;
    const total = totalCompanies || 1;
    return (count / total) * 100;
  }

  const sectorData = [
    {
      name: "Food and Beverage",
      percentage: getPercentage("Food and Beverage").toFixed(1),
      companies: sectorCounts["Food and Beverage"] || 0,
    },
    {
      name: "Animal Protein",
      percentage: getPercentage("Animal Protein").toFixed(1),
      companies: sectorCounts["Animal Protein"] || 0,
    },
    {
      name: "Agricultural Input",
      percentage: getPercentage("Agricultural Input").toFixed(1),
      companies: sectorCounts["Agricultural Input"] || 0,
    },
    {
      name: "Animal product and Commmodity",
      percentage: getPercentage("Animal product and Commmodity").toFixed(1),
      companies: sectorCounts["Animal product and Commmodity"] || 0,
    },
    {
      name: "Restaurant and Food Services",
      percentage: getPercentage("Restaurant and Food Services").toFixed(1),
      companies: sectorCounts["Restaurant and Food Services"] || 0,
    },
    {
      name: "Other Sectors",
      percentage: getPercentage("Other Sectors").toFixed(1),
      companies: sectorCounts["Other Sectors"] || 0,
    },
  ];

  return (
    <section className={styles.dataInsights}>
      <div className={styles.container}>
        <motion.div
          className={styles.header}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <h2 className={styles.sectionTitle}>Data Insights & Trends</h2>
          <p className={styles.sectionSubtitle}>
            Real-time analytics and comprehensive insights into the food
            industry's Net Zero journey
          </p>
        </motion.div>

        <div className={styles.contentGrid}>
          <motion.div
            className={styles.insightsGrid}
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <motion.div
              className={styles.insightCard}
              whileHover={{ y: -3, scale: 1.02 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <div className={styles.insightIcon}>
                <FiBarChart />
              </div>
              <div className={styles.insightContent}>
                <h3 className={styles.insightTitle}>Sector Analysis</h3>
                <div className={styles.insightValue}>{totalsectors}</div>
                <p className={styles.insightDescription}>
                  From Agricultural Input to Animal Protein industries
                </p>
                <div className={styles.insightTrend}>+12% this year</div>
              </div>
            </motion.div>
            <motion.div
              className={styles.insightCard}
              whileHover={{ y: -3, scale: 1.02 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <div className={styles.insightIcon}>
                <FiPieChart />
              </div>
              <div className={styles.insightContent}>
                <h3 className={styles.insightTitle}>Regional Distribution</h3>
                <div className={styles.insightValue}>{totalcountries}</div>
                <p className={styles.insightDescription}>
                  Across 6 continents with comprehensive coverage
                </p>
                <div className={styles.insightTrend}>Global reach</div>
              </div>
            </motion.div>
            {/* <motion.div
              className={styles.insightCard}
              whileHover={{ y: -3, scale: 1.02 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <div className={styles.insightIcon}>
                <FiTrendingUp />
              </div>
              <div className={styles.insightContent}>
                <h3 className={styles.insightTitle}>Progress Rate</h3>
                <div className={styles.insightValue}>{totalsectors}</div>
                <p className={styles.insightDescription}>
                  Companies showing measurable progress
                </p>
                <div className={styles.insightTrend}>+5% monthly</div>
              </div>
            </motion.div> */}
            <motion.div
              className={styles.insightCard}
              whileHover={{ y: -3, scale: 1.02 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <div className={styles.insightIcon}>
                <FiCalendar />
              </div>
              <div className={styles.insightContent}>
                <h3 className={styles.insightTitle}>Target Years</h3>
                <div className={styles.insightValue}>
                  {minyear}-{lastyear}
                </div>
                <p className={styles.insightDescription}>
                  Range of Net Zero commitment dates
                </p>
                <div className={styles.insightTrend}>
                  {medianTargetYear} median{" "}
                </div>
              </div>
            </motion.div>
          </motion.div>

          <motion.div
            className={styles.visualSection}
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            viewport={{ once: true }}
          >
            <div className={styles.chartContainer}>
              <h3 className={styles.chartTitle}>
                Industry Sector Distribution
              </h3>
              <div className={styles.sectorChart}>
                {sectorData.map((sector, index) => {
                  const percentage = parseFloat(sector.percentage);
                  const isZero = percentage === 0;
                  const isLowPercentage = percentage < 12;
                  const isVerySmall = percentage < 5 && percentage > 0; // For very small bars but not zero
                  const barWidth = Math.min(percentage * 2.5, 100);

                  return (
                    <div key={index} className={styles.sectorRow}>
                      {!isZero ? (
                        <motion.div
                          className={`${styles.sectorBar} ${
                            isVerySmall ? styles.sectorBarSmall : ""
                          }`}
                          initial={{ width: 0 }}
                          whileInView={{ width: `${barWidth}%` }}
                          transition={{ duration: 1, delay: index * 0.1 }}
                          viewport={{ once: true }}
                        >
                          <div className={styles.sectorInfo}>
                            <span
                              className={`${styles.sectorName} ${
                                isVerySmall ? styles.sectorNameSmall : ""
                              }`}
                            >
                              {sector.name}
                            </span>
                            {!isLowPercentage && (
                              <span className={styles.sectorStats}>
                                {sector.companies} companies (
                                {sector.percentage}
                                %)
                              </span>
                            )}
                          </div>
                        </motion.div>
                      ) : (
                        <div className={styles.sectorBarZero}>
                          <span className={styles.sectorNameZero}>
                            {sector.name}
                          </span>
                        </div>
                      )}
                      {(isLowPercentage || isZero) && (
                        <div className={styles.sectorStatsOutside}>
                          {sector.companies} companies ({sector.percentage}%)
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>

            <div className={styles.imageContainer}>
              <Image
                src="/asset/im12.jpg"
                alt="Data visualization"
                width={550} // Width in pixels
                height={200}
                className={styles.dataImage}
              />
              <div className={styles.imageOverlay}>
                <div className={styles.overlayContent}>
                  <h4>Explore Interactive Dashboard</h4>
                  <p>Dive deeper into comprehensive data analysis</p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        <motion.div
          className={styles.ctaSection}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          viewport={{ once: true }}
        >
          <motion.button
            className={styles.exploreButton}
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => router.push("/Dataexplorer")}
          >
            Explore Full Dataset
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
}

export default React.memo(DataInsights);
