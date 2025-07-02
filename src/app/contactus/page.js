"use client";

import {
  FiPhone,
  FiMail,
  FiClock,
  FiUsers,
  FiAward,
  FiShield,
} from "react-icons/fi";
import { FaRegHandshake } from "react-icons/fa";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import ContactForm from "./components/ContactForm";
import ContactInfo from "./components/ContactInfo";
import styles from "./page.module.css";

export default function Contactus() {
  // const features = [
  //   {
  //     icon: <FiClock />,
  //     title: "Quick Response",
  //     text: "Get answers within 24 hours",
  //   },
  //   {
  //     icon: <FiAward />,
  //     title: "Proven Results",
  //     text: "Get 100% accurate details about a company’s net-zero goals",
  //   },
  // {
  //   icon: <FiShield />,
  //   title: "Trusted Partner",
  //   text: "Confidential and professional service",
  // },
  //];

  return (
    <div className={styles.container}>
      <Header />
      <main className={styles.main}>
        <div className={styles.pageHeader}>
          <h1 className={styles.pageTitle}>
            {/* <FaRegHandshake /> */}
            Looking for more information?
          </h1>
          <p className={styles.pageSubtitle}>
            Contact us for our comprehensive and carefully curated company
            sustainability risk assessment reports that combine net zero target
            reporting, company emission reduction progress, verification, ESG
            and other climate reporting information.
          </p>
        </div>

        {/* <div className={styles.heroSection}>
          <h2 className={styles.heroTitle}>Looking for more information?</h2>
          <p className={styles.heroText}>
            Contact us for our comprehensive and carefully curated company
            sustainability risk assessment reports that combine net zero target
            reporting, company emission reduction progress, verification, ESG
            and climate reporting information.
          </p>
        </div> */}

        <div className={styles.contentGrid}>
          <ContactForm />
          {/* <ContactInfo /> */}
        </div>

        {/* <div className={styles.features}>
          {features.map((feature, index) => (
            <div key={index} className={styles.feature}>
              <div className={styles.featureIcon}>{feature.icon}</div>
              <h3 className={styles.featureTitle}>{feature.title}</h3>
              <p className={styles.featureText}>{feature.text}</p>
            </div>
          ))}
        </div> */}
      </main>
      <Footer />
    </div>
  );
}
