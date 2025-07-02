"use client";

import { FiX, FiExternalLink, FiCalendar } from "react-icons/fi";
import styles from "./NewsDetail.module.css";

export default function NewsDetail({ newsItem, onClose }) {
  if (!newsItem) return null;

  return (
    <div className={styles.modalOverlay} onClick={onClose}>
      <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
        <div className={styles.modalHeader}>
          <h1 className={styles.newsTitle}>{newsItem.title}</h1>
          <button className={styles.closeButton} onClick={onClose}>
            <FiX />
          </button>
        </div>

        <div className={styles.newsInfo}>
          <p>{newsItem.info}</p>
        </div>

        <div className={styles.contentSection}>
          {/* <h3 className={styles.contentLabel}>Article Content</h3> */}
          <div className={styles.contentContainer}>
            {newsItem.content.map((paragraph, index) => (
              <p key={index} className={styles.contentParagraph}>
                {paragraph}
              </p>
            ))}
          </div>
        </div>

        <div className={styles.modalActions}>
          <button
            className={styles.readMoreButton}
            onClick={() => window.open(newsItem.sourceUrl, "_blank")}
          >
            <FiExternalLink />
            Source
          </button>
        </div>
      </div>
    </div>
  );
}
