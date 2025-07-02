"use client";

import { FiEye, FiExternalLink } from "react-icons/fi";
import styles from "./NewsCard.module.css";

export default function NewsCard({ newsItem, onViewMore }) {
  return (
    <div className={styles.newsCard}>
      <div className={styles.cardContent}>
        <h3 className={styles.newsTitle}>{newsItem.title}</h3>
        <p className={styles.newsInfo}>{newsItem.info}</p>
      </div>

      <div className={styles.cardActions}>
        <button
          className={styles.viewMoreButton}
          onClick={() => onViewMore(newsItem)}
        >
          <FiEye />
          View More
        </button>

        {/* <button
          className={styles.sourceButton}
          onClick={() => window.open(newsItem.sourceUrl, "_blank")}
        >
          <FiExternalLink />
          Source
        </button> */}
      </div>
    </div>
  );
}
