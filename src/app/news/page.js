"use client";
import { useEffect, useState } from "react";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import NewsGrid from "./components/NewsGrid";
import NewsDetail from "./components/NewsDetail";
import styles from "./page.module.css";
import { FaRegNewspaper } from "react-icons/fa";

export default function newspage() {
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedNews, setSelectedNews] = useState(null);

  const getnews = async () => {
    try {
      setLoading(true);
      setError(null);
      const res = await fetch("api/news/getnews");
      if (res.ok) {
        const data = await res.json();
        setNews(data.news);
      } else {
        setError("Failed to fetch news articles. Please try again later.");
      }
    } catch (error) {
      console.error("Server error:", error);
      setError(
        "Unable to connect to the server. Please check your internet connection."
      );
    } finally {
      setLoading(false);
    }
  };

  const handleViewMore = (newsItem) => {
    setSelectedNews(newsItem);
  };

  const handleCloseDetail = () => {
    setSelectedNews(null);
  };

  useEffect(() => {
    getnews();
  }, []);

  return (
    <div className={styles.container}>
      <Header />
      <main className={styles.main}>
        <div className={styles.pageHeader}>
          <h1 className={styles.pageTitle}>
            <FaRegNewspaper />
            Latest News & Updates
          </h1>
          <p className={styles.pageSubtitle}>
            Stay informed with the latest developments in corporate
            sustainability and net-zero initiatives from around the world.
          </p>
        </div>

        {loading && (
          <div className={styles.loadingState}>
            <div className={styles.loadingSpinner}></div>
            <p className={styles.loadingText}>Loading news articles...</p>
          </div>
        )}

        {error && (
          <div className={styles.errorState}>
            <h3>Unable to Load News</h3>
            <p>{error}</p>
          </div>
        )}

        {!loading && !error && (
          <NewsGrid news={news} onViewMore={handleViewMore} />
        )}

        {selectedNews && (
          <NewsDetail newsItem={selectedNews} onClose={handleCloseDetail} />
        )}
      </main>
      <Footer />
    </div>
  );
}
