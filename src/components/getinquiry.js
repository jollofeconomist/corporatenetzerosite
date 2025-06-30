"use client";

import { useState, useEffect } from "react";
import {
  FiMail,
  FiUser,
  FiMessageSquare,
  FiTrash2,
  FiTag,
  FiInbox,
  FiClock,
} from "react-icons/fi";
import styles from "./getinquiry.module.css";

export default function Getinquiry() {
  const [inquiry, setinqury] = useState([]);

  const getinquiry = async () => {
    try {
      const res = await fetch("/api/inquiry/recevied");

      if (res.ok) {
        const data = await res.json();
        setinqury(data);
      } else {
        console.log("alert fettching the inqury");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const deleteinquiry = async (id) => {
    try {
      const res = await fetch(`api/inquiry/delete/${id}`, {
        method: "DELETE",
      });
      if (res.ok) {
        alert("deleted");
        getinquiry();
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getinquiry();
  }, []);

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1 className={styles.title}>
          <FiInbox />
          Customer Inquiries
        </h1>
        <p className={styles.subtitle}>
          Manage and respond to customer inquiries about sustainability and
          net-zero initiatives.
        </p>
      </div>

      {inquiry.length > 0 && (
        <div className={styles.statsBar}>
          <div className={styles.statItem}>
            <div className={styles.statIcon}>
              <FiMail />
            </div>
            <div className={styles.statContent}>
              <h3>{inquiry.length}</h3>
              <p>Total Inquiries</p>
            </div>
          </div>
        </div>
      )}

      {inquiry.length === 0 ? (
        <div className={styles.emptyState}>
          <div className={styles.emptyIcon}>
            <FiInbox />
          </div>
          <h3 className={styles.emptyTitle}>No Inquiries Yet</h3>
          <p className={styles.emptyText}>
            When customers submit inquiries through the contact form, they'll
            appear here.
          </p>
        </div>
      ) : (
        <div className={styles.inquiryGrid}>
          {inquiry.map((item, index) => (
            <div key={index} className={styles.inquiryCard}>
              <div className={styles.cardHeader}>
                <div className={styles.userInfo}>
                  <h2 className={styles.userName}>
                    <FiUser />
                    {item.name}
                  </h2>
                  <a href={`mailto:${item.email}`} className={styles.userEmail}>
                    <FiMail />
                    {item.email}
                  </a>
                </div>
                <button
                  className={styles.deleteButton}
                  onClick={() => deleteinquiry(item._id)}
                >
                  <FiTrash2 />
                  Delete
                </button>
              </div>

              <div className={styles.subjectSection}>
                <div className={styles.subjectLabel}>
                  <FiTag />
                  Subject
                </div>
                <div className={styles.subjectText}>{item.subject}</div>
              </div>

              <div className={styles.messageSection}>
                <div className={styles.messageLabel}>
                  <FiMessageSquare />
                  Message
                </div>
                <div className={styles.messageText}>{item.message}</div>
              </div>

              <div className={styles.cardFooter}>
                <div className={styles.inquiryMeta}>
                  <FiClock />
                  Inquiry #{index + 1}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
