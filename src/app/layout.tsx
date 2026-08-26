import type { Metadata } from "next";
import { Questrial } from "next/font/google";
import "./globals.css";
import { SITE } from "@/lib/constants";
import PageLoader from "@/components/site/PageLoader";

const questrial = Questrial({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-questrial",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: `${SITE.name} — ${SITE.tagline}`,
    template: `%s | ${SITE.name}`,
  },
  description: SITE.description,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="id" className={questrial.variable}>
      <body className="font-sans">
        <PageLoader />
        {children}
        </body>
    </html>
  );
}
