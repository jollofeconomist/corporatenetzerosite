import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Head from "next/head";
import { CompanyDataProvider } from "./context/CompanyDataContext";
import { ToastContainer } from "react-toastify";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Corporate Food Net Zero | Tracking Industry Climate Commitments",
  description:
    "Discover how 187 leading companies in the global food industry are progressing towards their Net Zero emissions targets. Get real-time insights, data-driven analysis, and transparent reporting on corporate climate commitments.",
  keywords:
    "net zero, corporate sustainability, food industry, climate change, emissions tracking, ESG",
  authors: [{ name: "Corporate Food Net Zero Team" }],
  openGraph: {
    title: "Corporate Food Net Zero | Tracking Industry Climate Commitments",
    description:
      "Tracking the food industry's journey towards Net Zero emissions with comprehensive data and insights.",
    type: "website",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable}`}>
      <body>
        <CompanyDataProvider>
          {children}
          <ToastContainer position="top-right" autoClose={3000} />
        </CompanyDataProvider>
      </body>
    </html>
  );
}
