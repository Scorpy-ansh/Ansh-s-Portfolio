import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "../context/ThemeContext";
import { ResumeProvider } from "../context/ResumeContext";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Anshuman Pattanayak | AI/ML Engineer",
  description:
    "Portfolio of Anshuman Pattanayak — AI/ML Engineer focused on data preprocessing, model building, explainable AI, and end-to-end machine learning pipelines.",
  keywords: ["AI Engineer", "ML Engineer", "Machine Learning", "Deep Learning", "Python", "TensorFlow"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${inter.variable} h-full scroll-smooth antialiased`}
    >
      <body className="min-h-full flex flex-col font-sans">
        <ThemeProvider>
          <ResumeProvider>{children}</ResumeProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
