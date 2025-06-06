"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import styles from "./EditModal.module.css";

function EditModal({ company, onClose, onSuccess }) {
  const [formData, setFormData] = useState({
    companyName: "",
    sector: "",
    country: "",
    continent: "",
    netzero: false,
    targetyear: "",
    companyyearrevenue: "",
    scope: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const router = useRouter();

  // Populate form with company data
  useEffect(() => {
    if (company) {
      setFormData({
        companyName: company.companyName || "",
        sector: company.sector || "",
        country: company.country || "",
        continent: company.continent || "",
        netzero: company.netzero || false,
        targetyear: company.targetyear || "",
        companyyearrevenue: company.companyyearrevenue || "",
        scope: company.scope || "",
      });
    }
  }, [company]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });

    // Clear error when user starts typing
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: "",
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    // Basic required field validation
    if (!formData.companyName.trim()) {
      newErrors.companyName = "Company name is required";
    }

    if (!formData.sector) {
      newErrors.sector = "Sector is required";
    }

    if (!formData.country.trim()) {
      newErrors.country = "Country is required";
    }

    if (!formData.continent) {
      newErrors.continent = "Continent is required";
    }

    if (formData.companyyearrevenue && formData.companyyearrevenue <= 0) {
      newErrors.companyyearrevenue = "Revenue amount must be greater than 0";
    }

    if (
      formData.targetyear &&
      (formData.targetyear < 2020 || formData.targetyear > 2500)
    ) {
      newErrors.targetyear = "Target year must be between 2020 and 2500";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const preparePayload = () => {
    const payload = {
      companyName: formData.companyName.trim(),
      sector: formData.sector,
      country: formData.country.trim(),
      continent: formData.continent,
      netzero: formData.netzero,
      companyyearrevenue: formData.companyyearrevenue
        ? parseInt(formData.companyyearrevenue, 10)
        : undefined,
    };

    if (formData.netzero) {
      if (formData.targetyear) {
        payload.targetyear = parseInt(formData.targetyear, 10);
      }
      if (formData.scope) {
        payload.scope = formData.scope;
      }
    }

    return payload;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsLoading(true);
    setErrors({});

    try {
      const payload = preparePayload();
      console.log("Updating company:", company._id, payload);

      const res = await fetch(`/api/updatedata/${company._id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      const data = await res.json();

      if (res.ok) {
        alert("Company data updated successfully!");
        onSuccess();
      } else {
        console.error("API error response:", data);

        if (res.status === 401) {
          alert("Authentication required. Please login first.");
          router.push("/admin");
          return;
        }

        if (data.errors) {
          setErrors(data.errors);
        } else {
          alert(
            data.message ||
              "Update failed. Please check your data and try again."
          );
        }
      }
    } catch (err) {
      console.error("Update error:", err);

      if (err instanceof SyntaxError && err.message.includes("JSON")) {
        alert("Server returned invalid response. Please try again.");
      } else if (err.name === "TypeError" && err.message.includes("fetch")) {
        alert("Network error. Please check your connection and try again.");
      } else {
        alert("An unexpected error occurred. Please try again.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div className={styles.overlay} onClick={handleOverlayClick}>
      <div className={styles.modal}>
        <div className={styles.header}>
          <h2 className={styles.title}>Edit Company</h2>
          <button onClick={onClose} className={styles.closeButton}>
            ×
          </button>
        </div>

        <form onSubmit={handleSubmit} className={styles.form}>
          <div className={styles.formGrid}>
            <div className={styles.inputGroup}>
              <label className={styles.label}>Company Name</label>
              <input
                type="text"
                name="companyName"
                value={formData.companyName}
                onChange={handleChange}
                className={`${styles.input} ${
                  errors.companyName ? styles.error : ""
                }`}
                placeholder="Enter company name"
                required
              />
              {errors.companyName && (
                <span className={styles.errorText}>{errors.companyName}</span>
              )}
            </div>

            <div className={styles.inputGroup}>
              <label className={styles.label}>Sector</label>
              <select
                name="sector"
                value={formData.sector}
                onChange={handleChange}
                className={`${styles.select} ${
                  errors.sector ? styles.error : ""
                }`}
                required
              >
                <option value="">Select Sector</option>
                <option value="Food and Beverage">Food and Beverage</option>
                <option value="Animal Protein">Animal Protein</option>
                <option value="Agricultural Input">Agricultural Input</option>
                <option value="Animal product and Commmodity">
                  Animal product and Commodity
                </option>
                <option value="Restaurant and Food Services">
                  Restaurant and Food Services
                </option>
                <option value="Other Sectors">Other Sectors</option>
              </select>
              {errors.sector && (
                <span className={styles.errorText}>{errors.sector}</span>
              )}
            </div>

            <div className={styles.inputGroup}>
              <label className={styles.label}>Country</label>
              <input
                type="text"
                name="country"
                value={formData.country}
                onChange={handleChange}
                className={`${styles.input} ${
                  errors.country ? styles.error : ""
                }`}
                placeholder="Enter country"
                required
              />
              {errors.country && (
                <span className={styles.errorText}>{errors.country}</span>
              )}
            </div>

            <div className={styles.inputGroup}>
              <label className={styles.label}>Continent</label>
              <select
                name="continent"
                value={formData.continent}
                onChange={handleChange}
                className={`${styles.select} ${
                  errors.continent ? styles.error : ""
                }`}
                required
              >
                <option value="">Select Continent</option>
                <option value="Asia">Asia</option>
                <option value="Europe">Europe</option>
                <option value="North America">North America</option>
                <option value="South America">South America</option>
                <option value="Africa">Africa</option>
                <option value="Australia">Australia</option>
              </select>
              {errors.continent && (
                <span className={styles.errorText}>{errors.continent}</span>
              )}
            </div>

            <div className={styles.inputGroupFull}>
              <label className={styles.label}>
                Company Year Revenue ($)
                <span style={{ color: "#6b7280", fontWeight: "normal" }}>
                  {" "}
                  (Optional)
                </span>
              </label>
              <input
                type="number"
                name="companyyearrevenue"
                value={formData.companyyearrevenue}
                onChange={handleChange}
                className={`${styles.input} ${
                  errors.companyyearrevenue ? styles.error : ""
                }`}
                placeholder="Enter annual revenue in USD (optional)"
                min="1"
              />
              {errors.companyyearrevenue && (
                <span className={styles.errorText}>
                  {errors.companyyearrevenue}
                </span>
              )}
            </div>

            <div className={styles.checkboxGroup}>
              <input
                type="checkbox"
                name="netzero"
                id="netzero-edit"
                checked={formData.netzero}
                onChange={handleChange}
                className={styles.checkbox}
              />
              <label htmlFor="netzero-edit" className={styles.checkboxLabel}>
                Has Net Zero Commitment
              </label>
            </div>

            {formData.netzero && (
              <div className={styles.conditionalSection}>
                <h3 className={styles.conditionalTitle}>Net Zero Details</h3>

                <div className={styles.inputGroup}>
                  <label className={styles.label}>
                    Target Year
                    <span style={{ color: "#6b7280", fontWeight: "normal" }}>
                      {" "}
                      (Optional)
                    </span>
                  </label>
                  <input
                    type="number"
                    name="targetyear"
                    value={formData.targetyear}
                    onChange={handleChange}
                    className={`${styles.input} ${
                      errors.targetyear ? styles.error : ""
                    }`}
                    placeholder="e.g., 2030 (optional)"
                    min="2020"
                    max="2500"
                  />
                  {errors.targetyear && (
                    <span className={styles.errorText}>
                      {errors.targetyear}
                    </span>
                  )}
                </div>

                <div className={styles.inputGroup}>
                  <label className={styles.label}>
                    Scope Coverage
                    <span style={{ color: "#6b7280", fontWeight: "normal" }}>
                      {" "}
                      (Optional)
                    </span>
                  </label>
                  <select
                    name="scope"
                    value={formData.scope}
                    onChange={handleChange}
                    className={`${styles.select} ${
                      errors.scope ? styles.error : ""
                    }`}
                  >
                    <option value="">Select Scope (Optional)</option>
                    <option value="1">Scope 1 (Direct Emissions)</option>
                    <option value="2">Scope 2 (Indirect Energy)</option>
                    <option value="3">Scope 3 (Value Chain)</option>
                  </select>
                  {errors.scope && (
                    <span className={styles.errorText}>{errors.scope}</span>
                  )}
                </div>
              </div>
            )}
          </div>

          <div className={styles.footer}>
            <button
              type="button"
              onClick={onClose}
              className={styles.cancelButton}
              disabled={isLoading}
            >
              Cancel
            </button>
            <button
              type="submit"
              className={styles.submitButton}
              disabled={isLoading}
            >
              {isLoading ? "Updating..." : "Update Company"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default EditModal;
