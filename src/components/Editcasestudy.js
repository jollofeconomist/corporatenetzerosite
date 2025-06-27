"use client";
import { useState, useEffect, useCallback } from "react";
import style from "./Editcasestudy.module.css";

export default function Editcasestudy() {
  const [casestudy, setcasestudy] = useState([]);
  const [editmodel, seteditmodel] = useState(false);
  const [edititem, setedititem] = useState(null);
  const [loading, setLoading] = useState(false);
  const [form, setform] = useState({
    title: "",
    company: "",
    industry: "",
    year: "",
    revenue: "",
    website: "",
    sections: [],
  });

  useEffect(() => {
    if (edititem) {
      setform({
        title: edititem.title || "",
        company: edititem.company || "",
        industry: edititem.industry || "",
        year: edititem.year || "",
        revenue: edititem.revenue || "",
        website: edititem.website || "",
        sections: edititem.sections || [],
      });
    }
  }, [edititem]);

  const handlesave = async (id) => {
    setLoading(true);
    try {
      const res = await fetch(`/api/editcasestudy/${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      });
      if (!res.ok) throw new Error("Failed to update");

      const data = await res.json();
      alert("Update successful!");
      seteditmodel(false);
      setedititem(null);
      getcasestudy();
    } catch (error) {
      console.error("getting error while saving the data", error);
      alert("Error updating case study. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handledelete = useCallback(async (id) => {
    if (!window.confirm("Are you sure you want to delete this case study?")) {
      return;
    }

    try {
      const res = await fetch(`/api/deletecasestudy/${id}`, {
        method: "DELETE",
      });
      if (!res.ok) {
        throw new Error("failed to delete");
      }
      const data = await res.json();
      alert(`Deleted: ${data.deleted.title}`);
      getcasestudy();
    } catch (error) {
      console.error("Error deleteing case studies:", error);
      alert("Error deleting case study. Please try again.");
    }
  }, []);

  const getcasestudy = async () => {
    try {
      const res = await fetch("/api/getcasestudy", {
        method: "GET",
      });
      if (!res.ok) {
        throw new Error("failed to fetch case study");
      }

      const data = await res.json();
      setcasestudy(data.caseStudies || []);
      console.log(data.caseStudies);
      console.log("id", data.caseStudies[1]?._id);
    } catch (error) {
      console.error("error fetching the case study", error);
    }
  };

  useEffect(() => {
    getcasestudy();
  }, []);

  const handleedit = async (item) => {
    seteditmodel(true);
    setedititem(item);
  };

  const closeModal = () => {
    seteditmodel(false);
    setedititem(null);
  };

  const handleSectionChange = (sectionIndex, field, value) => {
    const updated = [...form.sections];
    updated[sectionIndex][field] = value;
    setform({ ...form, sections: updated });
  };

  const handleContentChange = (sectionIndex, contentIndex, value) => {
    const updated = [...form.sections];
    updated[sectionIndex].content[contentIndex] = value;
    setform({ ...form, sections: updated });
  };

  const addNewSection = () => {
    const newSection = {
      heading: "",
      content: [""],
    };
    setform({ ...form, sections: [...form.sections, newSection] });
  };

  const removeSection = (sectionIndex) => {
    if (window.confirm("Are you sure you want to remove this section?")) {
      const updated = form.sections.filter(
        (_, index) => index !== sectionIndex
      );
      setform({ ...form, sections: updated });
    }
  };

  // Add new content item to a section
  const addContentItem = (sectionIndex) => {
    const updated = [...form.sections];
    updated[sectionIndex].content.push("");
    setform({ ...form, sections: updated });
  };

  // Remove content item from a section
  const removeContentItem = (sectionIndex, contentIndex) => {
    if (window.confirm("Are you sure you want to remove this content item?")) {
      const updated = [...form.sections];
      updated[sectionIndex].content = updated[sectionIndex].content.filter(
        (_, index) => index !== contentIndex
      );
      setform({ ...form, sections: updated });
    }
  };

  return (
    <div className={style.container}>
      <h1 className={style.title}>Edit Case Studies</h1>

      {casestudy.length === 0 ? (
        <div className={style.noData}>
          No case studies found. Add some case studies first.
        </div>
      ) : (
        <div className={style.tableContainer}>
          <table className={style.table}>
            <thead className={style.tableHeader}>
              <tr>
                <th>Case Study Title</th>
                <th>Company</th>
                <th>Industry</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {casestudy.map((item, index) => (
                <tr key={item._id || index} className={style.tableRow}>
                  <td className={style.tableCell}>
                    <div className={style.caseTitle}>{item.title}</div>
                  </td>
                  <td className={style.tableCell}>{item.company}</td>
                  <td className={style.tableCell}>{item.industry}</td>
                  <td className={style.tableCell}>
                    <div className={style.buttonGroup}>
                      <button
                        className={style.button}
                        onClick={() => handleedit(item)}
                      >
                        ✏️ Edit
                      </button>
                      <button
                        className={style.delbutton}
                        onClick={() => handledelete(item._id)}
                      >
                        🗑️ Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {editmodel && (
        <div className={style.modalOverlay} onClick={closeModal}>
          <div
            className={style.modalContent}
            onClick={(e) => e.stopPropagation()}
          >
            <div className={style.modalHeader}>
              <h2 className={style.modalTitle}>
                Edit Case Study: {edititem?.title}
              </h2>
              <button className={style.closeButton} onClick={closeModal}>
                ✕
              </button>
            </div>

            <div className={style.formGroup}>
              <label className={style.formLabel}>Title</label>
              <input
                type="text"
                className={style.formInput}
                value={form.title}
                onChange={(e) => setform({ ...form, title: e.target.value })}
                placeholder="Enter case study title"
              />
            </div>

            <div className={style.formGroup}>
              <label className={style.formLabel}>Company</label>
              <input
                type="text"
                className={style.formInput}
                value={form.company}
                onChange={(e) => setform({ ...form, company: e.target.value })}
                placeholder="Enter company name"
              />
            </div>

            <div className={style.formGroup}>
              <label className={style.formLabel}>Industry</label>
              <input
                type="text"
                className={style.formInput}
                value={form.industry}
                onChange={(e) => setform({ ...form, industry: e.target.value })}
                placeholder="Enter industry"
              />
            </div>

            <div className={style.formGroup}>
              <label className={style.formLabel}>Year</label>
              <input
                type="text"
                className={style.formInput}
                value={form.year}
                onChange={(e) => setform({ ...form, year: e.target.value })}
                placeholder="Enter year"
              />
            </div>

            <div className={style.formGroup}>
              <label className={style.formLabel}>Revenue</label>
              <input
                type="text"
                className={style.formInput}
                value={form.revenue}
                onChange={(e) => setform({ ...form, revenue: e.target.value })}
                placeholder="Enter revenue"
              />
            </div>

            <div className={style.formGroup}>
              <label className={style.formLabel}>Website</label>
              <input
                type="url"
                className={style.formInput}
                value={form.website}
                onChange={(e) => setform({ ...form, website: e.target.value })}
                placeholder="Enter website URL"
              />
            </div>

            {/* Content Sections */}
            <div>
              <div className={style.sectionHeaderWithButton}>
                <h3 className={style.sectionHeader}>Content Sections</h3>
                <button
                  type="button"
                  className={style.addSectionButton}
                  onClick={addNewSection}
                >
                  ➕ Add New Section
                </button>
              </div>

              {form.sections.map((section, sectionIndex) => (
                <div
                  key={section._id || sectionIndex}
                  className={style.sectionContainer}
                >
                  <div className={style.sectionControlHeader}>
                    <span className={style.sectionNumber}>
                      Section {sectionIndex + 1}
                    </span>
                    <button
                      type="button"
                      className={style.removeSectionButton}
                      onClick={() => removeSection(sectionIndex)}
                    >
                      🗑️ Remove Section
                    </button>
                  </div>

                  <div className={style.formGroup}>
                    <label className={style.formLabel}>Section Heading</label>
                    <input
                      type="text"
                      className={style.formInput}
                      value={section.heading || ""}
                      onChange={(e) =>
                        handleSectionChange(
                          sectionIndex,
                          "heading",
                          e.target.value
                        )
                      }
                      placeholder="Enter section heading"
                    />
                  </div>

                  {section.content?.map((item, contentIndex) => (
                    <div key={contentIndex} className={style.contentItem}>
                      <div className={style.contentHeader}>
                        <label className={style.contentLabel}>
                          Content {contentIndex + 1}
                        </label>
                        {section.content.length > 1 && (
                          <button
                            type="button"
                            className={style.removeContentButton}
                            onClick={() =>
                              removeContentItem(sectionIndex, contentIndex)
                            }
                          >
                            ✕
                          </button>
                        )}
                      </div>
                      <textarea
                        className={style.formTextarea}
                        value={item || ""}
                        onChange={(e) =>
                          handleContentChange(
                            sectionIndex,
                            contentIndex,
                            e.target.value
                          )
                        }
                        placeholder="Enter content"
                        rows={3}
                      />
                    </div>
                  ))}

                  <button
                    type="button"
                    className={style.addContentButton}
                    onClick={() => addContentItem(sectionIndex)}
                  >
                    ➕ Add Content Item
                  </button>
                </div>
              ))}

              {form.sections.length === 0 && (
                <div className={style.noSections}>
                  <p>
                    No sections yet. Click "Add New Section" to get started.
                  </p>
                </div>
              )}
            </div>

            <div className={style.modalActions}>
              <button
                className={style.cancelButton}
                onClick={closeModal}
                disabled={loading}
              >
                Cancel
              </button>
              <button
                className={style.saveButton}
                onClick={() => handlesave(edititem._id)}
                disabled={loading}
              >
                {loading ? "Saving..." : "Save Changes"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
