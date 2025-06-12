"use client";
import Image from "next/image";
import { motion } from "framer-motion";
import { FiTrendingUp, FiTarget, FiGlobe } from "react-icons/fi";
import styles from "./HeroSection.module.css";
import React, { useState, useEffect } from "react";

import { useCompanyData } from "../app/context/CompanyDataContext";

// Custom hook for count-up animation
const useCountUp = (endValue, duration = 2000, startDelay = 0) => {
  const [count, setCount] = useState(0);
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    if (!endValue || endValue === 0) return;

    const timer = setTimeout(() => {
      setIsActive(true);
    }, startDelay);

    return () => clearTimeout(timer);
  }, [endValue, startDelay]);

  useEffect(() => {
    if (!isActive || !endValue) return;

    let startTime;
    const animate = (currentTime) => {
      if (!startTime) startTime = currentTime;
      const progress = Math.min((currentTime - startTime) / duration, 1);

      // Easing function for smooth animation
      const easeOutQuart = 1 - Math.pow(1 - progress, 4);
      const currentCount = Math.floor(easeOutQuart * endValue);

      setCount(currentCount);

      if (progress < 1) {
        requestAnimationFrame(animate);
      } else {
        setCount(endValue);
      }
    };

    requestAnimationFrame(animate);
  }, [isActive, endValue, duration]);

  return count;
};

function HeroSection() {
  const {
    totalCompanies,
    loading,
    error,
    totalNetZeroCompanies,
    totalcountries,
    medianTargetYear,
  } = useCompanyData();

  // Count-up animations with staggered delays
  const animatedTotalCompanies = useCountUp(totalCompanies, 2000, 800);
  const animatedNetZeroCompanies = useCountUp(
    totalNetZeroCompanies,
    2000,
    1200
  );
  const animatedMedianYear = useCountUp(medianTargetYear, 2000, 1600);

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
            Tracking Global Corporate Food Industry's
            <span className={styles.highlight}> Net Zero Commitments</span>
          </motion.h1>

          <motion.div className={styles.subtitle}>
            {[
              "Discover",
              "how",
              {
                type: "number",
                content: animatedTotalCompanies,
                className: styles.com,
              },
              "leading",
              "companies",
              "in",
              "the",
              "global",
              "food",
              "industry",
              "are",
              "progressing",
              "towards",
              "their",
              "Net",
              "Zero",
              "emissions",
              "targets.",
              "Get",
              "real-time",
              "insights,",
              "data-driven",
              "analysis,",
              "and",
              "transparent",
              "reporting",
              "on",
              "corporate",
              "climate",
              "commitments.",
            ].map((word, index) => (
              <motion.span
                key={index}
                initial={{ opacity: 0, y: 20, filter: "blur(10px)" }}
                animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                transition={{
                  duration: 0.6,
                  delay: index * 0.08 + 1.0, // Start after hero title animation
                  ease: [0.25, 0.4, 0.25, 1], // Custom cubic-bezier easing
                }}
                className={typeof word === "object" ? word.className : ""}
                style={{
                  display: "inline-block",
                  marginRight: "0.35em",
                  whiteSpace: "nowrap",
                }}
              >
                {typeof word === "object" ? word.content : word}
              </motion.span>
            ))}
          </motion.div>

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
            <div className={styles.statNumber}>{animatedTotalCompanies}</div>
            <div className={styles.statLabel}>Number of Companies</div>
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
            <div className={styles.statNumber}>{animatedNetZeroCompanies}</div>
            <div className={styles.statLabel}>Companys Net Zero Targets</div>
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
            <div className={styles.statNumber}>{animatedMedianYear}</div>
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
