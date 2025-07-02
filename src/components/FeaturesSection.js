"use client";
import { motion } from "framer-motion";
import {
  FiDatabase,
  FiPieChart,
  FiUsers,
  FiMap,
  FiEye,
  FiTrendingUp,
} from "react-icons/fi";
import styles from "./FeaturesSection.module.css";
import React from "react";
import { useCompanyData } from "../app/context/CompanyDataContext";

// const data =

function FeaturesSection() {
  const { totalCompanies } = useCompanyData();
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delayChildren: 0.3,
        staggerChildren: 0.1,
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

  const emissionScopes = [
    {
      scope: "Scope 1",
      title: "Direct Emissions",
      description:
        "Direct GHG emissions from operations due to owned or controlled site and vehicle fuel consumption.",
      icon: <FiTrendingUp />,
      color: "#ef4444",
    },
    {
      scope: "Scope 2",
      title: "Indirect Energy Emissions",
      description:
        "Indirect GHG emissions outside the company's direct control, e.g., from purchased electricity and steam.",
      icon: <FiPieChart />,
      color: "#f59e0b",
    },
    {
      scope: "Scope 3",
      title: "Value Chain Emissions",
      description:
        "Indirect sources of GHG emissions that are within a company's entire value chain.",
      icon: <FiUsers />,
      color: "#22c55e",
    },
  ];

  const features = [
    {
      icon: <FiDatabase />,
      title: "Comprehensive Database",
      description: `Access detailed information on ${totalCompanies} leading companies across various food industry sectors.`,
    },
    {
      icon: <FiMap />,
      title: "Global Coverage",
      description:
        "Track companies across different countries and continents with geographic insights.",
    },
    {
      icon: <FiEye />,
      title: " Validation",
      description:
        "Reports industry accepted third-party validation standards.",
    },
  ];

  return (
    <section className={styles.features}>
      <div className={styles.container}>
        <motion.div
          className={styles.header}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <h2 className={styles.sectionTitle}>
            Understanding Emissions & Our Platform
          </h2>
          <p className={styles.sectionSubtitle}>
            Comprehensive tracking of corporate climate commitments across all
            emission scopes
          </p>
        </motion.div>

        <motion.div
          className={styles.scopesGrid}
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {emissionScopes.map((scope, index) => (
            <motion.div
              key={index}
              className={styles.scopeCard}
              variants={itemVariants}
              whileHover={{ y: -5, scale: 1.02 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <div className={styles.scopeIcon} style={{ color: scope.color }}>
                {scope.icon}
              </div>
              <div className={styles.scopeNumber}>{scope.scope}</div>
              <h3 className={styles.scopeTitle}>{scope.title}</h3>
              <p className={styles.scopeDescription}>{scope.description}</p>
              <div
                className={styles.scopeAccent}
                style={{ backgroundColor: scope.color }}
              />
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          className={styles.featuresGrid}
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {features.map((feature, index) => (
            <motion.div
              key={index}
              className={styles.featureCard}
              variants={itemVariants}
              whileHover={{ y: -5 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <div className={styles.featureIcon}>{feature.icon}</div>
              <h3 className={styles.featureTitle}>{feature.title}</h3>
              <p className={styles.featureDescription}>{feature.description}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

export default React.memo(FeaturesSection);
