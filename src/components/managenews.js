"use client";

import { useEffect, useState, Fragment } from "react";
import {
  FiEdit,
  FiTrash2,
  FiExternalLink,
  FiSave,
  FiX,
  FiPlus,
} from "react-icons/fi";
import styles from "./managenews.module.css";
import { FaNewspaper } from "react-icons/fa";

export default function managenews() {
  const [content, setcontent] = useState([]);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editingNews, setEditingNews] = useState(null);
  const [editForm, setEditForm] = useState({
    title: "",
    info: "",
    content: [""],
    sourceUrl: "",
  });

  const getnews = async () => {
    try {
      const res = await fetch("api/news/getnews", {
        method: "get",
        headers: { "Content-Type": "application/json" },
      });

      const data = await res.json();
      console.log(data.news);
      setcontent(data.news);
    } catch (error) {
      console.log(error);
    }
  };

  const handledelete = async (id) => {
    try {
      const res = await fetch(`api/news/deletnews/${id}`, {
        method: "delete",
      });
      if (res.ok) {
        getnews();
        console.log("deleted");
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleEdit = async (newsItem) => {
    setEditingNews(newsItem);
    setEditForm({
      title: newsItem.title,
      info: newsItem.info,
      content: [...newsItem.content],
      sourceUrl: newsItem.sourceUrl,
    });
    setIsEditModalOpen(true);
  };

  const handleEditFormChange = (e) => {
    const { name, value } = e.target;
    setEditForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleContentChange = (index, value) => {
    const updated = [...editForm.content];
    updated[index] = value;
    setEditForm((prev) => ({ ...prev, content: updated }));
  };

  const handleAddParagraph = () => {
    setEditForm((prev) => ({
      ...prev,
      content: [...prev.content, ""],
    }));
  };

  const handleSaveEdit = async (id) => {
    try {
      // Here you would call your edit API when it's ready
      // const res = await fetch(`api/news/editnews/${editingNews._id}`, {
      //   method: "PUT",
      //   headers: { "Content-Type": "application/json" },
      //   body: JSON.stringify(editForm),
      // });
      // if (res.ok) {
      //   getnews();
      //   setIsEditModalOpen(false);
      //   console.log("updated");
      // }

      try {
        const res = await fetch(`api/news/editnews/${id}`, {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(editForm),
        });
        if (res.ok) {
          getnews();
          console.log("edited");
        }
      } catch (error) {
        console.log(error);
      }

      console.log(
        "Edit functionality ready - API call will be made here",
        editForm
      );
      setIsEditModalOpen(false);
    } catch (error) {
      console.error(error);
    }
  };

  const closeModal = () => {
    setIsEditModalOpen(false);
    setEditingNews(null);
  };
  useEffect(() => {
    getnews();
  }, []);

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>
        <FaNewspaper />
        Manage News Articles
      </h1>

      <div className={styles.newsGrid}>
        {content.map((item, index) => (
          <div key={index} className={styles.newsCard}>
            <h2 className={styles.newsTitle}>{item.title}</h2>

            <div className={styles.buttonGroup}>
              <button
                className={styles.editButton}
                onClick={() => handleEdit(item)}
              >
                <FiEdit />
                Edit
              </button>
              <button
                className={styles.deleteButton}
                onClick={() => handledelete(item._id)}
              >
                <FiTrash2 />
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Edit Modal */}
      {isEditModalOpen && (
        <div className={styles.modalOverlay} onClick={closeModal}>
          <div
            className={styles.modalContent}
            onClick={(e) => e.stopPropagation()}
          >
            <h2 className={styles.modalTitle}>
              <FiEdit />
              Edit News Article
            </h2>

            <div className={styles.formGroup}>
              <label className={styles.label}>Title</label>
              <input
                className={styles.input}
                name="title"
                value={editForm.title}
                onChange={handleEditFormChange}
                placeholder="Enter article title..."
              />
            </div>

            <div className={styles.formGroup}>
              <label className={styles.label}>Info</label>
              <input
                className={styles.input}
                name="info"
                value={editForm.info}
                onChange={handleEditFormChange}
                placeholder="Enter article description..."
              />
            </div>

            <div className={styles.formGroup}>
              <label className={styles.label}>Content Paragraphs</label>
              {editForm.content.map((paragraph, index) => (
                <textarea
                  key={index}
                  className={styles.textarea}
                  value={paragraph}
                  onChange={(e) => handleContentChange(index, e.target.value)}
                  placeholder={`Enter paragraph ${index + 1} content...`}
                />
              ))}
              <button
                type="button"
                className={styles.addParagraphButton}
                onClick={handleAddParagraph}
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
                value={editForm.sourceUrl}
                onChange={handleEditFormChange}
                placeholder="Enter source URL..."
                type="url"
              />
            </div>

            <div className={styles.modalButtonGroup}>
              <button
                className={styles.saveButton}
                onClick={() => handleSaveEdit(editingNews._id)}
              >
                <FiSave />
                Save Changes
              </button>
              <button className={styles.cancelButton} onClick={closeModal}>
                <FiX />
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
