"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import styles from "./DataManagement.module.css";
import EditModal from "./EditModal";

function DataManagement() {
  const [companies, setCompanies] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");
  const [selectedCompany, setSelectedCompany] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [authStatus, setAuthStatus] = useState("checking");
  const [searchTerm, setSearchTerm] = useState("");
  const router = useRouter();

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const res = await fetch("/api/getdata", {
          method: "GET",
        });

        if (res.status === 401) {
          setAuthStatus("unauthenticated");
        } else {
          setAuthStatus("authenticated");
        }
      } catch (error) {
        console.error("Auth check error:", error);
        setAuthStatus("unauthenticated");
      }
    };

    checkAuth();
  }, []);

  const fetchCompanies = async () => {
    setIsLoading(true);
    setError("");

    try {
      const response = await fetch("/api/getdata", {
        method: "GET",
      });

      if (response.status === 401) {
        setAuthStatus("unauthenticated");
        router.push("/admin");
        return;
      }

      if (!response.ok) {
        throw new Error("Failed to fetch companies data");
      }

      const data = await response.json();
      setCompanies(data.data || []);
    } catch (err) {
      setError("Failed to load companies data");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (authStatus === "authenticated") {
      fetchCompanies();
    }
  }, [authStatus]);

  const handleEdit = (company) => {
    setSelectedCompany(company);
    setIsModalOpen(true);
  };

  const handleDelete = async (companyId, companyName) => {
    if (
      !window.confirm(
        `Are you sure you want to delete "${companyName}"? This action cannot be undone.`
      )
    ) {
      return;
    }

    try {
      const response = await fetch(`/api/updatedata/${companyId}`, {
        method: "DELETE",
      });

      if (response.status === 401) {
        setAuthStatus("unauthenticated");
        router.push("/admin");
        return;
      }

      if (response.ok) {
        alert("Company deleted successfully!");
        fetchCompanies(); // Refresh the list
      } else {
        const errorData = await response.json();
        alert(errorData.message || "Failed to delete company");
      }
    } catch (err) {
      console.error("Error deleting company:", err);
      alert("Failed to delete company. Please try again.");
    }
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
    setSelectedCompany(null);
  };

  const handleUpdateSuccess = () => {
    setIsModalOpen(false);
    setSelectedCompany(null);
    fetchCompanies();
  };

  const filteredCompanies = companies.filter((company) =>
    company.companyName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const logout = async () => {
    try {
      const res = await fetch("/api/logout", {
        method: "POST",
      });
      if (res.ok) {
        router.push("/admin");
      } else {
        console.error("Logout failed");
      }
    } catch (err) {
      console.error("Network error during logout", err);
    }
  };

  if (authStatus === "checking") {
    return (
      <div className={styles.container}>
        <div className={styles.loadingContainer}>
          <div className={styles.spinner}></div>
          <p>Checking authentication...</p>
        </div>
      </div>
    );
  }

  if (authStatus === "unauthenticated") {
    return (
      <div className={styles.container}>
        <div className={styles.errorContainer}>
          <p>Authentication required. Redirecting to login...</p>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <div>
          <h1 className={styles.title}>Manage Company Data</h1>
          <p className={styles.subtitle}>
            Edit and delete existing company records
          </p>
        </div>
        <button onClick={logout} className={styles.logoutButton}>
          Logout
        </button>
      </div>

      <div className={styles.content}>
        <div className={styles.toolbar}>
          <div className={styles.searchContainer}>
            <input
              type="text"
              placeholder="Search companies by name..."
              value={searchTerm}
              onChange={handleSearchChange}
              className={styles.searchInput}
            />
          </div>
          <button onClick={fetchCompanies} className={styles.refreshButton}>
            Refresh Data
          </button>
          <span className={styles.count}>
            {searchTerm
              ? `${filteredCompanies.length} of ${companies.length} companies`
              : `${companies.length} ${
                  companies.length === 1 ? "company" : "companies"
                } found`}
          </span>
        </div>

        {isLoading && (
          <div className={styles.loadingContainer}>
            <div className={styles.spinner}></div>
            <p>Loading companies...</p>
          </div>
        )}

        {error && (
          <div className={styles.errorContainer}>
            <p>{error}</p>
            <button onClick={fetchCompanies} className={styles.retryButton}>
              Try Again
            </button>
          </div>
        )}

        {!isLoading && !error && companies.length === 0 && (
          <div className={styles.emptyState}>
            <h3>No companies found</h3>
            <p>No company data available. Add some companies first.</p>
          </div>
        )}

        {!isLoading &&
          !error &&
          companies.length > 0 &&
          filteredCompanies.length === 0 &&
          searchTerm && (
            <div className={styles.emptyState}>
              <h3>No companies match your search</h3>
              <p>
                No companies found for "{searchTerm}". Try a different search
                term.
              </p>
            </div>
          )}

        {!isLoading &&
          !error &&
          companies.length > 0 &&
          (searchTerm === "" || filteredCompanies.length > 0) && (
            <div className={styles.tableContainer}>
              <table className={styles.table}>
                <thead>
                  <tr>
                    <th>Company Name</th>
                    <th>Sector</th>
                    <th>Country</th>
                    <th>Continent</th>
                    <th>Net Zero</th>
                    <th>Target Year</th>
                    <th>Revenue ($)</th>
                    <th>Scope</th>
                    <th>sciencebasedtargets</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredCompanies.map((company) => (
                    <tr key={company._id}>
                      <td className={styles.companyName}>
                        {company.companyName}
                      </td>
                      <td>{company.sector}</td>
                      <td>{company.country}</td>
                      <td>{company.continent}</td>
                      <td>
                        <span
                          className={`${styles.badge} ${
                            company.netzero
                              ? styles.badgeSuccess
                              : styles.badgeSecondary
                          }`}
                        >
                          {company.netzero ? "Yes" : "No"}
                        </span>
                      </td>
                      <td>
                        {company.netzero && company.targetyear
                          ? company.targetyear
                          : "-"}
                      </td>
                      <td>
                        {company.companyyearrevenue
                          ? `$${company.companyyearrevenue.toLocaleString()}`
                          : "-"}
                      </td>
                      <td>
                        {company.netzero && company.scope
                          ? `Scope ${company.scope}`
                          : "-"}
                      </td>
                      <td>
                        {company.sciencebasedtargets
                          ? company.sciencebasedtargets
                          : "-"}
                      </td>
                      <td>
                        <div className={styles.actions}>
                          <button
                            onClick={() => handleEdit(company)}
                            className={styles.editButton}
                            title="Edit company"
                          >
                            Edit
                          </button>
                          <button
                            onClick={() =>
                              handleDelete(company._id, company.companyName)
                            }
                            className={styles.deleteButton}
                            title="Delete company"
                          >
                            Delete
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
      </div>

      {isModalOpen && selectedCompany && (
        <EditModal
          company={selectedCompany}
          onClose={handleModalClose}
          onSuccess={handleUpdateSuccess}
        />
      )}
    </div>
  );
}

export default DataManagement;
