"use client";

import { useState } from "react";
import { FiPlus, FiSend, FiEdit3 } from "react-icons/fi";
import styles from "./addnews.module.css";

export default function addnews() {
  const [textarea, settextarea] = useState([""]);
  const [form, setForm] = useState({
    title: "",
    info: "",
    content: [""],
    sourceUrl: "",
  });

  const handlesubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch("api/news/addnews", {
        method: "POST",
        headers: { "Content-Type": "application/json" },

        body: JSON.stringify(form),
      });
      if (res.ok) {
        console.log("Submitted successfully");

        setForm({
          title: "",
          info: "",
          content: [""],
          sourceUrl: "",
        });
      } else {
        const error = await res.text();

        console.error("submit error", error);
      }
    } catch (err) {
      console.error("submit error", err);
    }
  };

  const handleAddTextarea = (e) => {
    e.preventDefault();
    setForm((prevForm) => ({
      ...prevForm,
      content: [...prevForm.content, ""],
    }));
  };

  const handleContentChange = (index, value) => {
    const updated = [...form.content];
    updated[index] = value;
    setForm((prevForm) => ({
      ...prevForm,
      content: updated,
    }));
  };

  const handleallchange = (e) => {
    const { name, value } = e.target;
    setForm((prevform) => ({ ...prevform, [name]: value }));
  };

  return (
    <div className={styles.container}>
      <form>
        <h1 className={styles.title}>
          <FiEdit3 />
          Add News Article
        </h1>

        <div className={styles.formGroup}>
          <label className={styles.label}>Title</label>
          <input
            className={styles.input}
            name="title"
            value={form.title}
            onChange={handleallchange}
            placeholder="Enter article title..."
          />
        </div>

        <div className={styles.formGroup}>
          <label className={styles.label}> location and date</label>
          <input
            className={styles.input}
            name="info"
            value={form.info}
            onChange={handleallchange}
            placeholder="ex (Paris, May 19, 2025, Scarborough, UK 27 Feb 2025)"
          />
        </div>

        <div className={styles.contentSection}>
          <label className={styles.contentLabel}>Content Paragraphs</label>
          {form.content.map((entry, index) => (
            <textarea
              key={index}
              className={styles.textarea}
              value={entry}
              onChange={(e) => handleContentChange(index, e.target.value)}
              placeholder={`Enter paragraph ${index + 1} content...`}
            />
          ))}

          <button
            type="button"
            className={styles.addButton}
            onClick={handleAddTextarea}
          >
            <FiPlus />
            Add Paragraph
          </button>
        </div>

        <div className={styles.formGroup}>
          <label className={styles.label}>Source URL</label>
          <input
            className={styles.input}
            name="sourceUrl"
            value={form.sourceUrl}
            onChange={handleallchange}
            placeholder="Enter source URL..."
            type="url"
          />
        </div>

        <button
          type="submit"
          className={styles.submitButton}
          onClick={handlesubmit}
        >
          <FiSend />
          Publish Article
        </button>
      </form>
    </div>
  );
}
