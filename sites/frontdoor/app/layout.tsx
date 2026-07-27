import type { Metadata } from "next";
import { Bebas_Neue, Noto_Sans_SC, Space_Mono } from "next/font/google";
import { WorkbenchShell } from "@/components/shell/workbench-shell";
import "@/app/globals.css";

const bodyFont = Noto_Sans_SC({
  subsets: ["latin"],
  weight: ["300", "400", "500", "700", "900"],
  variable: "--font-body",
});

const displayFont = Bebas_Neue({
  subsets: ["latin"],
  weight: ["400"],
  variable: "--font-display",
});

const monoFont = Space_Mono({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-mono",
});

export const metadata: Metadata = {
  title: "LATINOS · 工作台",
  description: "Latin Dance OS frontdoor for Daily Latin, legacy proof, and Dance OS demos.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-CN">
      <body className={`${bodyFont.variable} ${displayFont.variable} ${monoFont.variable}`}>
        <WorkbenchShell>{children}</WorkbenchShell>
      </body>
    </html>
  );
}
