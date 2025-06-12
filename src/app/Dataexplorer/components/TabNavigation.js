"use client";
import { memo } from "react";
import { motion } from "framer-motion";
import { FiDatabase } from "react-icons/fi";
import { TfiBarChart } from "react-icons/tfi";
import styles from "./TabNavigation.module.css";

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

TabNavigation.displayName = "TabNavigation";

export default TabNavigation;
