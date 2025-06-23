"use client";

import React, { useState } from "react";
import CompanyForm from "../../components/CompanyForm";
import DataManagement from "../../components/DataManagement";
import CaseStudy from "../../components/Casestudy";
import styles from "./page.module.css";

export default function AddDataPage() {
  const [activeTab, setActiveTab] = useState("add");

  return (
    <div className={styles.container}>
      <div className={styles.tabContainer}>
        <div className={styles.tabList}>
          <button
            onClick={() => setActiveTab("add")}
            className={`${styles.tab} ${
              activeTab === "add" ? styles.active : ""
            }`}
          >
            <span className={styles.tabIcon}>+</span>
            Add New Data
          </button>

          <button
            onClick={() => setActiveTab("manage")}
            className={`${styles.tab} ${
              activeTab === "manage" ? styles.active : ""
            }`}
          >
            <span className={styles.tabIcon}>⚙️</span>
            Manage Data
          </button>
          <button
            onClick={() => setActiveTab("casestudy")}
            className={`${styles.tab} ${
              activeTab === "casestudy" ? styles.active : ""
            }`}
          >
            <span className={styles.tabIcon}>📄 </span>
            case study
          </button>
        </div>
      </div>

      <div className={styles.tabContent}>
        {activeTab === "add" && <CompanyForm />}
        {activeTab === "manage" && <DataManagement />}
        {activeTab === "casestudy" && <CaseStudy />}
      </div>
    </div>
  );
}
