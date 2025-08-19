import type { Metadata } from "next";
import "./globals.css";
import "../styles/prism.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { GoogleAnalytics } from "@next/third-parties/google";
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
          url: '/api/feed',
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
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://localhost:3000'
  const gaId = process.env.NEXT_PUBLIC_GA_ID
  
  // 网站JSON-LD结构化数据
  const websiteJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'Bi Blog',
    description: '分享技术见解，记录成长历程，探索未知领域',
    url: baseUrl,
    author: {
      '@type': 'Person',
      name: 'Bi',
      url: baseUrl,
    },
    publisher: {
      '@type': 'Organization',
      name: 'Bi Blog',
      logo: {
        '@type': 'ImageObject',
        url: `${baseUrl}/logo.png`,
      },
    },
  }

  return (
    <html lang="zh-CN" suppressHydrationWarning>
      <body className="font-sans">
        {/* Google Analytics */}
        {gaId && <GoogleAnalytics gaId={gaId} />}
        
        {/* 网站结构化数据 */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteJsonLd) }}
        />
        
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
