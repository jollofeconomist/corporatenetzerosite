import Header from "../components/Header";
import HeroSection from "../components/HeroSection";
import FeaturesSection from "../components/FeaturesSection";
import DataInsights from "../components/DataInsights";
import Footer from "../components/Footer";
import styles from "./page.module.css";
import { CompanyDataProvider } from "./context/CompanyDataContext";

export default function Home() {
  return (
    <CompanyDataProvider>
      <div className={styles.page}>
        <Header />
        <main className={styles.main}>
          <HeroSection />
          <FeaturesSection />
          <DataInsights />
        </main>
        <Footer />
      </div>
    </CompanyDataProvider>
  );
}
