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
  const features = [
    {
      icon: <FiClock />,
      title: "Quick Response",
      text: "Get answers within 24 hours",
    },
    {
      icon: <FiAward />,
      title: "Proven Results",
      text: "Get 100% accurate details about a company’s net-zero goals",
    },
    // {
    //   icon: <FiShield />,
    //   title: "Trusted Partner",
    //   text: "Confidential and professional service",
    // },
  ];

  return (
    <div className={styles.container}>
      <Header />
      <main className={styles.main}>
        <div className={styles.pageHeader}>
          <h1 className={styles.pageTitle}>
            <FaRegHandshake />
            Contact Us
          </h1>
          <p className={styles.pageSubtitle}>
            Curious to learn more about a specific company’s Net Zero journey?
            If you need extra details, like their goals, progress, or
            sustainability commitments, we’re here to help. Just reach out!
          </p>
        </div>

        <div className={styles.heroSection}>
          <h2 className={styles.heroTitle}>
            Let's Build a Sustainable Future Together
          </h2>
          <p className={styles.heroText}>
            Whether you're researching a company's climate efforts or need help
            understanding their environmental impact, feel free to ask. We're
            here to provide clear, detailed, and friendly support, no jargon,
            just helpful info.
          </p>
        </div>

        <div className={styles.contentGrid}>
          <ContactForm />
          <ContactInfo />
        </div>

        <div className={styles.features}>
          {features.map((feature, index) => (
            <div key={index} className={styles.feature}>
              <div className={styles.featureIcon}>{feature.icon}</div>
              <h3 className={styles.featureTitle}>{feature.title}</h3>
              <p className={styles.featureText}>{feature.text}</p>
            </div>
          ))}
        </div>
      </main>
      <Footer />
    </div>
  );
}
