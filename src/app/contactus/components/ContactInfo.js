"use client";

import {
  FiMail,
  FiPhone,
  FiMapPin,
  FiClock,
  FiMessageCircle,
} from "react-icons/fi";
import { FaLinkedin, FaTwitter, FaGithub } from "react-icons/fa";
import styles from "./ContactInfo.module.css";

export default function ContactInfo() {
  const contactDetails = [
    {
      icon: <FiMail />,
      title: "Email Us",
      info: "info@corporatefoodnetzero.com",
      action: "mailto:info@corporatefoodnetzero.com",
    },
    {
      icon: <FiPhone />,
      title: "Call Us",
      info: "+1 (555) 123-4567",
      action: "tel:+15551234567",
    },
    {
      icon: <FiMapPin />,
      title: "Visit Us",
      info: "Newcastle",
      action: "#",
    },
  ];

  const socialLinks = [
    {
      icon: <FaLinkedin />,
      name: "LinkedIn",
      url: "https://linkedin.com",
      color: "#0077b5",
    },
    {
      icon: <FaTwitter />,
      name: "Twitter",
      url: "https://twitter.com",
      color: "#1da1f2",
    },
    {
      icon: <FaGithub />,
      name: "GitHub",
      url: "https://github.com",
      color: "#333",
    },
  ];

  return (
    <div className={styles.contactInfoContainer}>
      <div className={styles.infoHeader}>
        <h2 className={styles.infoTitle}>Get in Touch</h2>
        <p className={styles.infoSubtitle}>
          Want to learn more about a company’s Net Zero goals or need help
          finding detailed insights? We’re happy to guide you — just reach out
          and ask!
        </p>
      </div>

      <div className={styles.contactGrid}>
        {contactDetails.map((detail, index) => (
          <div key={index} className={styles.contactItem}>
            <div className={styles.contactIcon}>{detail.icon}</div>
            <div className={styles.contactContent}>
              <h3 className={styles.contactTitle}>{detail.title}</h3>
              {detail.action && detail.action !== "#" ? (
                <a href={detail.action} className={styles.contactLink}>
                  {detail.info}
                </a>
              ) : (
                <p className={styles.contactText}>{detail.info}</p>
              )}
            </div>
          </div>
        ))}
      </div>

      <div className={styles.additionalInfo}>
        <div className={styles.responseTime}>
          <FiMessageCircle />
          <div>
            <h4>Quick Response</h4>
            <p>We typically respond within 24 hours</p>
          </div>
        </div>

        <div className={styles.socialSection}>
          {/* <h4 className={styles.socialTitle}>Follow Us</h4> */}
          <div className={styles.socialLinks}>
            {/* {socialLinks.map((social, index) => (
              <a
                key={index}
                href={social.url}
                target="_blank"
                rel="noopener noreferrer"
                className={styles.socialLink}
                style={{ "--social-color": social.color }}
                aria-label={`Follow us on ${social.name}`}
              >
                {social.icon}
              </a>
            ))} */}
          </div>
        </div>
      </div>
    </div>
  );
}
