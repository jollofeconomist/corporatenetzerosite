"use client";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import { FiMenu, FiX } from "react-icons/fi";
import styles from "./Header.module.css";
import React from "react";

function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      setIsScrolled(scrollTop > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  return (
    <motion.header
      className={`${styles.header} ${isScrolled ? styles.scrolled : ""}`}
      initial={{ opacity: 0, y: -50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <div className={styles.container}>
        <motion.div
          className={styles.logo}
          whileHover={{ scale: 1.05 }}
          transition={{ type: "spring", stiffness: 300 }}
        >
          <Link href="/">
            <Image
              src="/favicon.ico"
              alt="Corporate Food Net Zero"
              width={35}
              height={35}
              className={styles.logoImage}
            />
          </Link>
          <h2 className={styles.logoText} href="/">
            Food NetZero
          </h2>
        </motion.div>

        {/* Desktop Navigation */}
        <nav className={styles.nav}>
          <motion.div
            className={styles.desktopNav}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
          >
            <Link href="/" className={styles.navLink} scroll={false}>
              Home
            </Link>
            <Link
              href="/Dataexplorer"
              className={styles.navLink}
              scroll={false}
            >
              Data Explore
            </Link>
            <Link href="/aboutus" className={styles.navLink} scroll={false}>
              About Us
            </Link>
            <Link href="/contact-us" className={styles.navLink} scroll={false}>
              Contact Us
            </Link>
            <Link href="/contact-us" className={styles.navLink} scroll={false}>
              Case study
            </Link>
            <Link href="/contact-us" className={styles.navLink} scroll={false}>
              News
            </Link>
          </motion.div>
        </nav>

        <div className={styles.rightSection}>
          <motion.button
            className={styles.ctaButton}
            whileHover={{ scale: 1.05, backgroundColor: "#15803d" }}
            whileTap={{ scale: 0.95 }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.5 }}
          >
            Get Started
          </motion.button>

          {/* Mobile Menu Button */}
          <motion.button
            className={styles.mobileMenuButton}
            onClick={toggleMobileMenu}
            whileTap={{ scale: 0.95 }}
            aria-label="Toggle mobile menu"
          >
            {isMobileMenuOpen ? <FiX /> : <FiMenu />}
          </motion.button>
        </div>
      </div>

      {/* Mobile Navigation Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            className={styles.mobileMenu}
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div className={styles.mobileMenuContent}>
              <Link
                href="/"
                className={styles.mobileNavLink}
                onClick={closeMobileMenu}
                scroll={false}
              >
                Home
              </Link>
              <Link
                href="/Dataexplorer"
                className={styles.mobileNavLink}
                onClick={closeMobileMenu}
                scroll={false}
              >
                Data Explore
              </Link>
              <Link
                href="/aboutus"
                className={styles.mobileNavLink}
                onClick={closeMobileMenu}
                scroll={false}
              >
                About Us
              </Link>
              <Link
                href="/contact-us"
                className={styles.mobileNavLink}
                onClick={closeMobileMenu}
                scroll={false}
              >
                Contact Us
              </Link>
              <Link
                href="/contact-us"
                className={styles.mobileNavLink}
                onClick={closeMobileMenu}
                scroll={false}
              >
                Case study
              </Link>
              <Link
                href="/contact-us"
                className={styles.mobileNavLink}
                onClick={closeMobileMenu}
                scroll={false}
              >
                News
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}

export default React.memo(Header);
