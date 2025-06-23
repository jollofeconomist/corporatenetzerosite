"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import {
  FiPlus,
  FiTrash2,
  FiSave,
  FiFileText,
  FiCalendar,
  FiDollarSign,
  FiGlobe,
  FiEdit3,
} from "react-icons/fi";
import styles from "./Casestudy.module.css";
import { FaBuilding } from "react-icons/fa";

export default function CaseStudyPage() {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [caseStudies, setCaseStudies] = useState({
    title: "",
    company: "",
    industry: "",
    year: "",
    revenue: "",
    website: "",
    sections: [],
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCaseStudies((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSectionChange = (index, value) => {
    const updated = [...caseStudies.sections];
    updated[index].heading = value;
    setCaseStudies((prev) => ({ ...prev, sections: updated }));
  };

  const handleParagraphChange = (sectionIndex, paraIndex, value) => {
    const updated = [...caseStudies.sections];
    updated[sectionIndex].content[paraIndex] = value;
    setCaseStudies((prev) => ({ ...prev, sections: updated }));
  };

  const addSection = () => {
    setCaseStudies((prev) => ({
      ...prev,
      sections: [...prev.sections, { heading: "", content: [""] }],
    }));
  };

  const removeSection = (index) => {
    setCaseStudies((prev) => ({
      ...prev,
      sections: prev.sections.filter((_, i) => i !== index),
    }));
  };

  const addParagraph = (sectionIndex) => {
    const updated = [...caseStudies.sections];
    updated[sectionIndex].content.push("");
    setCaseStudies((prev) => ({ ...prev, sections: updated }));
  };

  const removeParagraph = (sectionIndex, paraIndex) => {
    const updated = [...caseStudies.sections];
    updated[sectionIndex].content = updated[sectionIndex].content.filter(
      (_, i) => i !== paraIndex
    );
    setCaseStudies((prev) => ({ ...prev, sections: updated }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const res = await fetch("/api/casestudy", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(caseStudies),
      });

      if (res.ok) {
        router.push("/casestudy");
      } else {
        alert("Failed to submit case study");
      }
    } catch (error) {
      alert("Error submitting case study");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className={styles.caseStudyPage}>
      <div className={styles.container}>
        <motion.div
          className={styles.header}
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className={styles.headerIcon}>
            <FiFileText />
          </div>
          <h1 className={styles.title}>Create Case Study</h1>
          <p className={styles.subtitle}>
            Document and share corporate net zero success stories and
            initiatives
          </p>
        </motion.div>

        <motion.form
          className={styles.form}
          onSubmit={handleSubmit}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          {/* Basic Information Section */}
          <div className={styles.section}>
            <h2 className={styles.sectionTitle}>Basic Information</h2>
            <div className={styles.formGrid}>
              <div className={styles.inputGroup}>
                <label className={styles.label}>
                  <FiFileText className={styles.labelIcon} />
                  Case Study Title
                </label>
                <input
                  type="text"
                  name="title"
                  value={caseStudies.title}
                  onChange={handleChange}
                  className={styles.input}
                  placeholder="Enter case study title..."
                  required
                />
              </div>

              <div className={styles.inputGroup}>
                <label className={styles.label}>
                  <FaBuilding className={styles.labelIcon} />
                  Company Name
                </label>
                <input
                  type="text"
                  name="company"
                  value={caseStudies.company}
                  onChange={handleChange}
                  className={styles.input}
                  placeholder="Enter company name..."
                  required
                />
              </div>

              <div className={styles.inputGroup}>
                <label className={styles.label}>Industry Sector</label>
                <input
                  type="text"
                  name="industry"
                  value={caseStudies.industry}
                  onChange={handleChange}
                  className={styles.input}
                  placeholder="Enter industry sector..."
                  required
                />
              </div>

              <div className={styles.inputGroup}>
                <label className={styles.label}>
                  <FiCalendar className={styles.labelIcon} />
                  Year(optional)
                </label>
                <input
                  type="number"
                  name="year"
                  value={caseStudies.year}
                  onChange={handleChange}
                  className={styles.input}
                  placeholder="2024"
                />
              </div>

              <div className={styles.inputGroup}>
                <label className={styles.label}>
                  <FiDollarSign className={styles.labelIcon} />
                  Annual Revenue
                </label>
                <input
                  type="text"
                  name="revenue"
                  value={caseStudies.revenue}
                  onChange={handleChange}
                  className={styles.input}
                  placeholder="e.g., $1.2B, €500M"
                />
              </div>

              <div className={styles.inputGroup}>
                <label className={styles.label}>
                  <FiGlobe className={styles.labelIcon} />
                  Company Website
                </label>
                <input
                  type="url"
                  name="website"
                  value={caseStudies.website}
                  onChange={handleChange}
                  className={styles.input}
                  placeholder="https://company.com"
                />
              </div>
            </div>
          </div>

          {/* Content Sections */}
          <div className={styles.section}>
            <div className={styles.sectionHeader}>
              <h2 className={styles.sectionTitle}>Case Study Content</h2>
              <motion.button
                type="button"
                onClick={addSection}
                className={styles.addButton}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <FiPlus />
                Add Section
              </motion.button>
            </div>

            <AnimatePresence>
              {caseStudies.sections.map((section, i) => (
                <motion.div
                  key={i}
                  className={styles.contentSection}
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className={styles.sectionControls}>
                    <h3 className={styles.contentSectionTitle}>
                      Section {i + 1}
                    </h3>
                    <button
                      type="button"
                      onClick={() => removeSection(i)}
                      className={styles.removeButton}
                    >
                      <FiTrash2 />
                    </button>
                  </div>

                  <div className={styles.inputGroup}>
                    <label className={styles.label}>
                      <FiEdit3 className={styles.labelIcon} />
                      Section Heading
                    </label>
                    <input
                      type="text"
                      value={section.heading}
                      onChange={(e) => handleSectionChange(i, e.target.value)}
                      className={styles.input}
                      placeholder="Enter section heading..."
                      required
                    />
                  </div>

                  <div className={styles.paragraphsContainer}>
                    <label className={styles.label}>Content Paragraphs</label>
                    {section.content.map((para, j) => (
                      <div key={j} className={styles.paragraphGroup}>
                        <div className={styles.paragraphHeader}>
                          <span className={styles.paragraphLabel}>
                            Paragraph {j + 1}
                          </span>
                          {section.content.length > 1 && (
                            <button
                              type="button"
                              onClick={() => removeParagraph(i, j)}
                              className={styles.removeParaButton}
                            >
                              <FiTrash2 />
                            </button>
                          )}
                        </div>
                        <textarea
                          value={para}
                          onChange={(e) =>
                            handleParagraphChange(i, j, e.target.value)
                          }
                          className={styles.textarea}
                          placeholder="Enter paragraph content..."
                          rows="4"
                          cols="100"
                          required
                        />
                      </div>
                    ))}

                    <button
                      type="button"
                      onClick={() => addParagraph(i)}
                      className={styles.addParagraphButton}
                    >
                      <FiPlus />
                      Add Paragraph
                    </button>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>

            {caseStudies.sections.length === 0 && (
              <div className={styles.emptyState}>
                <FiFileText className={styles.emptyIcon} />
                <p>
                  No sections added yet. Click "Add Section" to get started.
                </p>
              </div>
            )}
          </div>

          {/* Submit Button */}
          <motion.div
            className={styles.submitSection}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
          >
            <motion.button
              type="submit"
              className={styles.submitButton}
              disabled={isSubmitting}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <FiSave />
              {isSubmitting ? "Saving..." : "Save Case Study"}
            </motion.button>
          </motion.div>
        </motion.form>
      </div>
    </div>
  );
}
