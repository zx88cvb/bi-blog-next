import type { Metadata } from "next";
import "./globals.css";
import "../styles/prism.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
// 网站访客分析
import { Analytics } from '@vercel/analytics/next';

export const metadata: Metadata = {
  title: "Bi Blog - 个人博客",
  description: "分享技术见解，记录成长历程，探索未知领域",
  keywords: ["博客", "技术", "前端", "开发"],
  authors: [{ name: "Bi" }],
  creator: "Bi",
  publisher: "Bi",
  icons: {
    icon: "/logo.png",
    shortcut: "/logo.png",
    apple: "/logo.png",
  },
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  alternates: {
    types: {
      'application/rss+xml': [
        {
          title: 'Bi Blog RSS Feed',
          url: '/api/rss',
        },
      ],
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-CN" suppressHydrationWarning>
      <body className="font-sans">
        <Header />
        <main className="min-h-screen pt-16">
          {children}
        </main>
        <Footer />
        <Analytics />
      </body>
    </html>
  );
}
