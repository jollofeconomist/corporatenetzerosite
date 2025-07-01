import Header from "../components/Header";
import HeroSection from "../components/HeroSection";
import FeaturesSection from "../components/FeaturesSection";
import DataInsights from "../components/DataInsights";
import Footer from "../components/Footer";
import styles from "./page.module.css";
import { CompanyDataProvider } from "./context/CompanyDataContext";
//import { useRouter } from "next/navigation";

export default function Home() {
  //const router = useRouter();
  return (
    <div className={styles.page}>
      <Header />
      <main className={styles.main}>
        <HeroSection />
        <FeaturesSection />
        <DataInsights />
      </main>
      <Footer />
    </div>
  );
}
