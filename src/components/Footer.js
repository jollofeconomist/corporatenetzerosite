"use client";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  FiMail,
  FiTwitter,
  FiLinkedin,
  FiGithub,
  FiGlobe,
} from "react-icons/fi";
import styles from "./Footer.module.css";
import React from "react";

function Footer() {
  const footerLinks = [
    {
      title: "Platform",
      links: [
        { name: "Data Explore", href: "/data-explore" },
        { name: "Company Profiles", href: "/companies" },
        { name: "Sector Analysis", href: "/sectors" },
        { name: "API Access", href: "/api" },
      ],
    },
    {
      title: "Resources",
      links: [
        { name: "About Us", href: "/about-us" },
        { name: "Methodology", href: "/methodology" },
        { name: "Research Papers", href: "/research" },
        { name: "Blog", href: "/blog" },
      ],
    },
    {
      title: "Support",
      links: [
        { name: "Contact Us", href: "/contact-us" },
        { name: "Help Center", href: "/help" },
        { name: "Privacy Policy", href: "/privacy" },
        { name: "Terms of Service", href: "/terms" },
      ],
    },
  ];

  const socialLinks = [
    { icon: <FiTwitter />, href: "#", label: "Twitter" },
    { icon: <FiLinkedin />, href: "#", label: "LinkedIn" },
    { icon: <FiGithub />, href: "#", label: "GitHub" },
    { icon: <FiGlobe />, href: "#", label: "Website" },
  ];

  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <div className={styles.footerContent}>
          <motion.div
            className={styles.brandSection}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h3 className={styles.brandTitle}>Corporate Food Net Zero</h3>
            <p className={styles.brandDescription}>
              Tracking the food industry's journey towards Net Zero emissions.
              Providing transparent, data-driven insights into corporate climate
              commitments.
            </p>
            <div className={styles.socialLinks}>
              {socialLinks.map((social, index) => (
                <motion.a
                  key={index}
                  href={social.href}
                  className={styles.socialLink}
                  whileHover={{ scale: 1.1, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  aria-label={social.label}
                >
                  {social.icon}
                </motion.a>
              ))}
            </div>
          </motion.div>

          <div className={styles.linksSection}>
            {footerLinks.map((section, index) => (
              <motion.div
                key={index}
                className={styles.linkColumn}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <h4 className={styles.linkTitle}>{section.title}</h4>
                <ul className={styles.linkList}>
                  {section.links.map((link, linkIndex) => (
                    <li key={linkIndex}>
                      <Link href={link.href} className={styles.footerLink}>
                        {link.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>

        <motion.div
          className={styles.newsletter}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true }}
        >
          <div className={styles.newsletterContent}>
            <div className={styles.newsletterInfo}>
              <h4 className={styles.newsletterTitle}>Stay Updated</h4>
              <p className={styles.newsletterDescription}>
                Get the latest insights and updates on corporate Net Zero
                progress
              </p>
            </div>
            <div className={styles.newsletterForm}>
              <input
                type="email"
                placeholder="Enter your email"
                className={styles.emailInput}
              />
              <motion.button
                className={styles.subscribeButton}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <FiMail />
                Subscribe
              </motion.button>
            </div>
          </div>
        </motion.div>

        <motion.div
          className={styles.footerBottom}
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          viewport={{ once: true }}
        >
          <div className={styles.copyright}>
            <p>&copy; 2024 Corporate Food Net Zero. All rights reserved.</p>
          </div>
          <div className={styles.bottomLinks}>
            <Link href="/privacy" className={styles.bottomLink}>
              Privacy
            </Link>
            <Link href="/terms" className={styles.bottomLink}>
              Terms
            </Link>
            <Link href="/cookies" className={styles.bottomLink}>
              Cookies
            </Link>
          </div>
        </motion.div>
      </div>
    </footer>
  );
}

export default React.memo(Footer);
