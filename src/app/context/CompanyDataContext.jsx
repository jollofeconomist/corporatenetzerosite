"use client";
import {
  createContext,
  use,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";

const CompanyDataContext = createContext();

export const CompanyDataProvider = ({ children }) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCompanies = async () => {
      try {
        const res = await fetch("/api/getdata");
        const json = await res.json();
        if (res.ok) {
          setData(json.data);
        } else {
          setError(json.error || "Failed to fetch data");
        }
      } catch (err) {
        setError("Network error");
      } finally {
        setLoading(false);
      }
    };

    fetchCompanies();
  }, []);

  const totalCompanies = useMemo(() => data.length, [data]);
  const totalNetZeroCompanies = useMemo(
    () => data.filter((company) => company.netzero).length,
    [data]
  );

  const medianTargetYear = useMemo(() => {
    const years = data
      .map((company) => parseInt(company.targetyear, 10))
      .filter((year) => !isNaN(year))
      .sort((a, b) => a - b);
    const len = years.length;
    if (len === 0) return null;

    const mid = Math.floor(len / 2);
    return len % 2 === 0
      ? Math.round((years[mid - 1] + years[mid]) / 2)
      : years[mid];
  }, [data]);

  const totalsectors = useMemo(() => {
    const sectors = new Set(
      data.map((company) => company.sector?.toLowerCase().trim())
    );
    return sectors.size;
  }, [data]);

  const totalcountries = useMemo(() => {
    const countries = new Set(
      data
        .map((company) => company.country?.toLowerCase().trim())
        .filter(Boolean)
    );
    return countries.size;
  }, [data]);

  const minyear = useMemo(() => {
    const years = data
      .map((company) => parseInt(company.targetyear, 10))
      .filter((year) => !isNaN(year))
      .sort((a, b) => a - b);
    if (years.length === 0) return null;
    const firstYear = years[0];
    return firstYear;
  }, [data]);

  const lastyear = useMemo(() => {
    const years = data
      .map((company) => parseInt(company.targetyear, 10))
      .filter((year) => !isNaN(year))
      .sort((a, b) => a - b);
    if (years.length === 0) return null;
    const lastYear = years[years.length - 1];
    return lastYear;
  });
  const sectorCounts = useMemo(() => {
    const counts = {};

    data.forEach((company) => {
      const sector = company.sector;
      if (sector) {
        counts[sector] = (counts[sector] || 0) + 1;
      }
    });

    return counts;
  }, [data]);

  return (
    <CompanyDataContext.Provider
      value={{
        data,
        totalCompanies,
        loading,
        error,
        totalNetZeroCompanies,
        medianTargetYear,
        totalsectors,
        totalcountries,
        minyear,
        lastyear,
        sectorCounts,
      }}
    >
      {children}
    </CompanyDataContext.Provider>
  );
};

export const useCompanyData = () => useContext(CompanyDataContext);
