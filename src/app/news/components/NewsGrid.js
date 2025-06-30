"use client";

import NewsCard from "./NewsCard";
import styles from "./NewsGrid.module.css";

export default function NewsGrid({ news, onViewMore }) {
  if (news.length === 0) {
    return (
      <div className={styles.emptyState}>
        <h3>No news articles available</h3>
        <p>Check back later for updates!</p>
      </div>
    );
  }

  return (
    <div className={styles.newsGrid}>
      {news.map((newsItem, index) => (
        <NewsCard key={index} newsItem={newsItem} onViewMore={onViewMore} />
      ))}
    </div>
  );
}
