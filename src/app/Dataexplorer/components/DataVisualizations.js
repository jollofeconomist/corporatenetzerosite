"use client";
import { useMemo, memo } from "react";
import { motion } from "framer-motion";
import { FiPieChart } from "react-icons/fi";
import { TfiBarChart } from "react-icons/tfi";
import styles from "./DataVisualizations.module.css";

const NetZeroPieChart = memo(({ companies }) => {
  const chartData = useMemo(() => {
    const withNetZero = companies.filter((c) => c.netzero).length;
    const withoutNetZero = companies.length - withNetZero;

    return {
      labels: ["With Net Zero Target", "Without Net Zero Target"],
      datasets: [
        {
          data: [withNetZero, withoutNetZero],
          backgroundColor: ["#22c55e", "#ef4444"],
          borderColor: ["#16a34a", "#dc2626"],
          borderWidth: 2,
        },
      ],
    };
  }, [companies]);

  const centerPercentage = useMemo(() => {
    const withNetZero = companies.filter((c) => c.netzero).length;
    return Math.round((withNetZero / companies.length) * 100);
  }, [companies]);

  return (
    <div className={styles.chartContainer}>
      <h3 className={styles.chartTitle}>
        <FiPieChart />
        Net Zero Target Distribution
      </h3>
      <div className={styles.pieChartWrapper}>
        <div className={styles.pieChart}>
          <svg viewBox="0 0 100 100" className={styles.pieSvg}>
            <circle
              cx="50"
              cy="50"
              r="40"
              fill="none"
              stroke="#ef4444"
              strokeWidth="20"
              strokeDasharray={`${centerPercentage * 2.51} ${
                (100 - centerPercentage) * 2.51
              }`}
              strokeDashoffset="62.75"
              transform="rotate(-90 50 50)"
            />
            <circle
              cx="50"
              cy="50"
              r="40"
              fill="none"
              stroke="#22c55e"
              strokeWidth="20"
              strokeDasharray={`${centerPercentage * 2.51} 251`}
              strokeDashoffset="0"
              transform="rotate(-90 50 50)"
            />
          </svg>
          <div className={styles.pieCenter}>
            <span className={styles.piePercentage}>{centerPercentage}%</span>
            <span className={styles.pieLabel}>Net Zero</span>
          </div>
        </div>
        <div className={styles.pieLegend}>
          <div className={styles.legendItem}>
            <div
              className={styles.legendColor}
              style={{ backgroundColor: "#22c55e" }}
            ></div>
            <span>
              With Net Zero ({companies.filter((c) => c.netzero).length})
            </span>
          </div>
          <div className={styles.legendItem}>
            <div
              className={styles.legendColor}
              style={{ backgroundColor: "#ef4444" }}
            ></div>
            <span>
              Without Net Zero ({companies.filter((c) => !c.netzero).length})
            </span>
          </div>
        </div>
      </div>
    </div>
  );
});

const SectorBarChart = memo(({ companies }) => {
  const sectorData = useMemo(() => {
    const sectors = {};
    companies.forEach((company) => {
      const sector = company.sector || "Unknown";
      if (!sectors[sector]) {
        sectors[sector] = { withNetZero: 0, withoutNetZero: 0 };
      }
      if (company.netzero) {
        sectors[sector].withNetZero++;
      } else {
        sectors[sector].withoutNetZero++;
      }
    });

    return Object.entries(sectors).map(([sector, data]) => ({
      sector,
      withNetZero: data.withNetZero,
      withoutNetZero: data.withoutNetZero,
      total: data.withNetZero + data.withoutNetZero,
      percentage: Math.round(
        (data.withNetZero / (data.withNetZero + data.withoutNetZero)) * 100
      ),
    }));
  }, [companies]);

  const maxTotal = Math.max(...sectorData.map((d) => d.total));

  return (
    <div className={styles.chartContainer}>
      <h3 className={styles.chartTitle}>
        <TfiBarChart />
        Net Zero Status by Sector
      </h3>
      <div className={styles.verticalBarChart}>
        {sectorData.map((data, index) => (
          <motion.div
            key={data.sector}
            className={styles.verticalBarGroup}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <div className={styles.verticalBarContainer}>
              <div className={styles.verticalBarsWrapper}>
                <motion.div
                  className={styles.verticalBarWithNetZero}
                  initial={{ height: 0 }}
                  animate={{
                    height: `${(data.withNetZero / maxTotal) * 100}%`,
                  }}
                  transition={{ delay: index * 0.1 + 0.3, duration: 0.8 }}
                >
                  <span className={styles.verticalBarValue}>
                    {data.withNetZero}
                  </span>
                </motion.div>
                <motion.div
                  className={styles.verticalBarWithoutNetZero}
                  initial={{ height: 0 }}
                  animate={{
                    height: `${(data.withoutNetZero / maxTotal) * 100}%`,
                  }}
                  transition={{ delay: index * 0.1 + 0.5, duration: 0.8 }}
                >
                  <span className={styles.verticalBarValue}>
                    {data.withoutNetZero}
                  </span>
                </motion.div>
              </div>
              <div className={styles.verticalBarLabels}>
                <span className={styles.withNetZeroLabel}>Net Zero</span>
                <span className={styles.withoutNetZeroLabel}>No Target</span>
              </div>
            </div>
            <div className={styles.verticalBarLabel}>{data.sector}</div>
            <div className={styles.verticalBarPercentage}>
              {data.percentage}% Net Zero
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
});

// Vertical Country Bar Chart Component
const CountryBarChart = memo(({ companies }) => {
  const countryData = useMemo(() => {
    const countries = {};
    companies.forEach((company) => {
      const country = company.country || "Unknown";
      if (!countries[country]) {
        countries[country] = { withNetZero: 0, withoutNetZero: 0 };
      }
      if (company.netzero) {
        countries[country].withNetZero++;
      } else {
        countries[country].withoutNetZero++;
      }
    });

    return Object.entries(countries)
      .map(([country, data]) => ({
        country,
        withNetZero: data.withNetZero,
        withoutNetZero: data.withoutNetZero,
        total: data.withNetZero + data.withoutNetZero,
        percentage: Math.round(
          (data.withNetZero / (data.withNetZero + data.withoutNetZero)) * 100
        ),
      }))
      .sort((a, b) => b.total - a.total)
      .slice(0, 10); // Top 10 countries
  }, [companies]);

  const maxTotal = Math.max(...countryData.map((d) => d.total));

  return (
    <div className={styles.chartContainer}>
      <h3 className={styles.chartTitle}>
        <TfiBarChart />
        Net Zero Status by Country (Top 10)
      </h3>
      <div className={styles.verticalBarChart}>
        {countryData.map((data, index) => (
          <motion.div
            key={data.country}
            className={styles.verticalBarGroup}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <div className={styles.verticalBarContainer}>
              <div className={styles.verticalBarsWrapper}>
                <motion.div
                  className={styles.verticalBarWithNetZero}
                  initial={{ height: 0 }}
                  animate={{
                    height: `${(data.withNetZero / maxTotal) * 100}%`,
                  }}
                  transition={{ delay: index * 0.1 + 0.3, duration: 0.8 }}
                >
                  <span className={styles.verticalBarValue}>
                    {data.withNetZero}
                  </span>
                </motion.div>
                <motion.div
                  className={styles.verticalBarWithoutNetZero}
                  initial={{ height: 0 }}
                  animate={{
                    height: `${(data.withoutNetZero / maxTotal) * 100}%`,
                  }}
                  transition={{ delay: index * 0.1 + 0.5, duration: 0.8 }}
                >
                  <span className={styles.verticalBarValue}>
                    {data.withoutNetZero}
                  </span>
                </motion.div>
              </div>
              <div className={styles.verticalBarLabels}>
                <span className={styles.withNetZeroLabel}>Net Zero</span>
                <span className={styles.withoutNetZeroLabel}>No Target</span>
              </div>
            </div>
            <div className={styles.verticalBarLabel}>{data.country}</div>
            <div className={styles.verticalBarPercentage}>
              {data.percentage}% Net Zero
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
});

export default function DataVisualizations({ companies }) {
  return (
    <div className={styles.chartsGrid}>
      <NetZeroPieChart companies={companies} />
      <SectorBarChart companies={companies} />
      <CountryBarChart companies={companies} />
    </div>
  );
}
