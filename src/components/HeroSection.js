"use client";
import Image from "next/image";
import { motion } from "framer-motion";
import { FiTrendingUp, FiTarget, FiGlobe } from "react-icons/fi";
import styles from "./HeroSection.module.css";
import React from "react";

import { useCompanyData } from "../app/context/CompanyDataContext";

function HeroSection() {
  const {
    totalCompanies,
    loading,
    error,
    totalNetZeroCompanies,
    totalcountries,
    medianTargetYear,
  } = useCompanyData();
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delayChildren: 0.3,
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100,
      },
    },
  };

  return (
    <section className={styles.hero}>
      <div className={styles.backgroundImages}>
        <div className={styles.imageWrapper}>
          <Image
            src="/asset/img2.jpg"
            alt="Sustainable farming"
            fill
            className={styles.backgroundImage}
            priority
          />
        </div>
        <div className={styles.overlay} />
      </div>

      <div className={styles.container}>
        <motion.div
          className={styles.content}
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.h1 className={styles.title} variants={itemVariants}>
            Tracking Corporate Food Industry's
            <span className={styles.highlight}> Net Zero Journey</span>
          </motion.h1>

          <motion.p className={styles.subtitle} variants={itemVariants}>
            Discover how {totalCompanies} leading companies in the global food
            industry are progressing towards their Net Zero emissions targets.
            Get real-time insights, data-driven analysis, and transparent
            reporting on corporate climate commitments.
          </motion.p>

          <motion.div className={styles.ctaGroup} variants={itemVariants}>
            <motion.button
              className={styles.primaryButton}
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
            >
              Explore Data
            </motion.button>
            <motion.button
              className={styles.secondaryButton}
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
            >
              Learn More
            </motion.button>
          </motion.div>
        </motion.div>

        <motion.div
          className={styles.statsGrid}
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {/* {stats.map((stat, index) => (
            <motion.div
              key={index}
              className={styles.statCard}
              variants={itemVariants}
              whileHover={{ y: -5, scale: 1.02 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <div className={styles.statIcon}>{stat.icon}</div>
              <div className={styles.statNumber}>{stat.number}</div>
              <div className={styles.statLabel}>{stat.label}</div>
              <div className={styles.statDescription}>{stat.description}</div>
            </motion.div>
          ))} */}

          <motion.div
            className={styles.statCard}
            variants={itemVariants}
            whileHover={{ y: -5, scale: 1.02 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <div className={styles.statIcon}>
              <FiGlobe />
            </div>
            <div className={styles.statNumber}>{totalCompanies}</div>
            <div className={styles.statLabel}>Leading Companies</div>
            <div className={styles.statDescription}>
              Global food industry leaders
            </div>
          </motion.div>
          <motion.div
            className={styles.statCard}
            variants={itemVariants}
            whileHover={{ y: -5, scale: 1.02 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <div className={styles.statIcon}>
              <FiTarget />
            </div>
            <div className={styles.statNumber}>{totalNetZeroCompanies}</div>
            <div className={styles.statLabel}>Have Net Zero Targets</div>
            <div className={styles.statDescription}>
              Committed to emissions reduction
            </div>
          </motion.div>
          <motion.div
            className={styles.statCard}
            variants={itemVariants}
            whileHover={{ y: -5, scale: 1.02 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <div className={styles.statIcon}>
              <FiTrendingUp />
            </div>
            <div className={styles.statNumber}>{medianTargetYear}</div>
            <div className={styles.statLabel}>Average Target Year</div>
            <div className={styles.statDescription}>
              Industry transformation timeline
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

export default React.memo(HeroSection);
