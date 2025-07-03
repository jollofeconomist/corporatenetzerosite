"use client";
import { motion } from "framer-motion";
import Image from "next/image";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import styles from "./page.module.css";

import { RiSeedlingLine } from "react-icons/ri";
import { VscGraph } from "react-icons/vsc";
import { useCompanyData } from "../../app/context/CompanyDataContext";

export default function AboutUsPage() {
  const { totalCompanies } = useCompanyData();
  const fadeInUp = {
    initial: { opacity: 0, y: 60 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6, ease: "easeOut" },
  };

  const staggerContainer = {
    animate: {
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  return (
    <>
      <Header />
      <div className={styles.container}>
        <motion.section
          className={styles.heroSection}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
        >
          <div className={styles.heroContent}>
            <motion.h1 className={styles.heroTitle} {...fadeInUp}>
              Our Mission
            </motion.h1>
            <motion.p
              className={styles.heroSubtitle}
              {...fadeInUp}
              transition={{ delay: 0.2, duration: 0.6 }}
            >
              Transparent data for sustainable agrifood transformation
            </motion.p>
          </div>
        </motion.section>

        <motion.section
          className={styles.aboutSection}
          variants={staggerContainer}
          initial="initial"
          animate="animate"
        >
          <div className={styles.contentWrapper}>
            <motion.div className={styles.aboutCard} variants={fadeInUp}>
              <h2 className={styles.sectionTitle}>
                About the Corporate Agrifood Net Zero Project
              </h2>
              <div className={styles.aboutContent}>
                <p>
                  Achieving the environmental goals in the corporate agrifood
                  and business sector requires transparent and easily accessible
                  data on corporate targets, standards and reporting
                  initiatives. This important knowledge is often stored in
                  inaccessible databases and corporate reports or behind
                  paywalls. The goal of our work is to make this data widely
                  accessible for informed decision-making by policymakers,
                  consumers, suppliers and other relevant stakeholders.
                </p>
                <p></p>
              </div>
            </motion.div>

            <motion.div className={styles.statsGrid} variants={fadeInUp}>
              <div className={styles.statCard}>
                <h3>{totalCompanies}</h3>
                <p>Companies Tracked</p>
              </div>
              <div className={styles.statCard}>
                <h3>Global</h3>
                <p>Coverage</p>
              </div>
              <div className={styles.statCard}>
                <h3>Real-time</h3>
                <p>Data Updates</p>
              </div>
            </motion.div>
          </div>
        </motion.section>

        <motion.section
          className={styles.teamSection}
          variants={staggerContainer}
          initial="initial"
          animate="animate"
        >
          <div className={styles.contentWrapper}>
            <motion.h2 className={styles.sectionTitle} variants={fadeInUp}>
              Our Team
            </motion.h2>

            <div className={styles.teamGrid}>
              <motion.div className={styles.teamCard} variants={fadeInUp}>
                <div className={styles.memberImageWrapper}>
                  <Image
                    src="/asset/albert_Boaitey.jpg"
                    alt="Albert Boaitey"
                    width={200}
                    height={200}
                    className={styles.memberImage}
                  />
                </div>
                <div className={styles.memberInfo}>
                  <h3 className={styles.memberName}>Albert Boaitey Ph.D</h3>
                  <p className={styles.memberRole}>
                    Lead Corporate Agrifood Net Zero Project
                  </p>
                  <div className={styles.memberBio}>
                    <p>
                      Albert is a Lead for the Corporate Agrifood Net Zero
                      Project. He is a Lecturer in Global Agri-Food Supply
                      Chains. He holds a PhD in Agricultural and Resource
                      Economics from the University of Alberta, Canada.
                    </p>
                    <p>
                      His work focuses on agribusiness sustainability
                      transition, food marketing and supply chains.
                    </p>
                  </div>
                  <div className={styles.memberTags}>
                    <span className={styles.tag}>Sustainability</span>
                    <span className={styles.tag}>Supply Chains</span>
                    <span className={styles.tag}>Agribusiness</span>
                  </div>
                </div>
              </motion.div>

              <motion.div className={styles.teamCard} variants={fadeInUp}>
                <div className={styles.memberImageWrapper}>
                  <div className={styles.memberImagePlaceholder}>
                    <span>DR</span>
                  </div>
                </div>
                <div className={styles.memberInfo}>
                  <h3 className={styles.memberName}>Digvijaysingh Raut</h3>
                  <p className={styles.memberRole}>Data Analyst</p>
                  <div className={styles.memberBio}>
                    <p>
                      Digvijaysingh coordinates the data assembly for the
                      Corporate Agrifood Net Zero Project. He leads the data
                      extraction, assembling and management.
                    </p>
                    <p>
                      Digvijaysingh has an MSc. Sustainable Agriculture and Food
                      Security from Newcastle University.
                    </p>
                  </div>
                  <div className={styles.memberTags}>
                    <span className={styles.tag}>Data Analysis</span>
                    <span className={styles.tag}>Food Security</span>
                    <span className={styles.tag}>Research</span>
                  </div>
                        
                </div>
              </motion.div>
                        <motion.div className={styles.teamCard} variants={fadeInUp}>
                <div className={styles.memberImageWrapper}>
                  <Image
                    src="/asset/Katherine.png"
                    alt="Albert Boaitey"
                    width={200}
                    height={200}
                    className={styles.memberImage}
                  />
                </div>
                <div className={styles.memberInfo}>
                  <h3 className={styles.memberName}>Katherine Scaling </h3>
                  <p className={styles.memberRole}>case study support</p>
                  <div className={styles.memberBio}>
                    <p>
                      Katherine contributes to the writing of the case studies.
                      She holds a degree in Food Business Management and
                      Marketing from Newcastle University and is currently part
                      of Hilton Foods' Future Business Leaders Graduate Program.
                      Katherine is passionate about food, farming,
                      sustainability, and the decarbonisation of agri-food
                      supply chains.
                    </p>
                  </div>
                  <div className={styles.memberTags}>
                    <span className={styles.tag}>Food</span>
                    <span className={styles.tag}>Agriculture</span>
                    <span className={styles.tag}>Agribusiness</span>
                  </div>
                </div>
              </motion.div>
              <motion.div className={styles.teamCard} variants={fadeInUp}>
                <div className={styles.memberImageWrapper}>
                  <Image
                    src="/asset/Katherine.png"
                    alt="Albert Boaitey"
                    width={200}
                    height={200}
                    className={styles.memberImage}
                  />
                </div>
                <div className={styles.memberInfo}>
                  <h3 className={styles.memberName}>Katherine Scaling </h3>
                  <p className={styles.memberRole}>case study support</p>
                  <div className={styles.memberBio}>
                    <p>
                      Katherine contributes to the writing of the case studies.
                      She holds a degree in Food Business Management and
                      Marketing from Newcastle University and is currently part
                      of Hilton Foods' Future Business Leaders Graduate Program.
                      Katherine is passionate about food, farming,
                      sustainability, and the decarbonisation of agri-food
                      supply chains.
                    </p>
                  </div>
                  <div className={styles.memberTags}>
                    <span className={styles.tag}>Food</span>
                    <span className={styles.tag}>Agriculture</span>
                    <span className={styles.tag}>Agribusiness</span>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </motion.section>

        <motion.section
          className={styles.missionSection}
          variants={fadeInUp}
          initial="initial"
          animate="animate"
        >
          <div className={styles.contentWrapper}>
            <div className={styles.missionCard}>
              <h2 className={styles.sectionTitle}>Our Impact</h2>
              <div className={styles.impactGrid}>
                <div className={styles.impactItem}>
                  <div className={styles.impactIcon}>
                    <RiSeedlingLine
                      style={{ color: "white", fontSize: "54px" }}
                    />
                  </div>
                  <h3>Transparency</h3>
                  <p>
                    Making corporate sustainability data accessible to all
                    stakeholders
                  </p>
                </div>
                <div className={styles.impactItem}>
                  <div className={styles.impactIcon}>
                    <VscGraph />
                  </div>
                  <h3>Data-Driven Decisions</h3>
                  <p>
                    Empowering policymakers and consumers with comprehensive
                    insights
                  </p>
                </div>
                {/* <div className={styles.impactItem}>
                  <div className={styles.impactIcon}>🤝</div>
                  <h3>Collaboration</h3>
                  <p>Fostering partnerships across the agrifood supply chain</p>
                </div> */}
                <div className={styles.impactItem}>
                  <div className={styles.impactIcon}>🎯</div>
                  <h3>Net Zero Goals</h3>
                  <p>
                    Accelerating progress towards corporate net zero commitments
                  </p>
                </div>
              </div>
            </div>
          </div>
        </motion.section>
      </div>
      <Footer />
    </>
  );
}
