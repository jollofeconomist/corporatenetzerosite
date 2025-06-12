"use client";
import { motion } from "framer-motion";
import { FiTarget } from "react-icons/fi";
import styles from "./LoadingComponent.module.css";

const LoadingComponent = ({ message = "Loading company data..." }) => {
  return (
    <div className={styles.loadingContainer}>
      <motion.div
        className={styles.loader}
        animate={{ rotate: 360 }}
        transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
      >
        <FiTarget />
      </motion.div>
      <p className={styles.loadingText}>{message}</p>
    </div>
  );
};

export default LoadingComponent;
