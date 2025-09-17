import type { Metadata } from "next";
import "./globals.css";
import "../styles/prism.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { GoogleAnalytics } from "@next/third-parties/google";
// 网站访客分析
import { Analytics } from '@vercel/analytics/next';

export const metadata: Metadata = {
  title: "HaydenBi",
  description: "分享前端、后端、全栈开发技术见解，记录项目实践与成长历程，探索独立开发与出海产品经验",
  keywords: ["博客", "技术", "前端", "开发", "后端", "全栈", "出海"],
  authors: [{ name: "HaydenBi" }],
  creator: "HaydenBi",
  publisher: "HaydenBi",
  icons: {
    icon: "https://r2.haydenbi.com/logo/logo.png",
    shortcut: "https://r2.haydenbi.com/logo/logo.png",
    apple: "https://r2.haydenbi.com/logo/logo.png",
  },
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  openGraph: {
    type: 'website',
    locale: 'zh_CN',
    url: '/',
    siteName: 'HaydenBi',
    title: 'HaydenBi',
    description: '分享前端、后端、全栈开发技术见解，记录项目实践与成长历程，探索独立开发与出海产品经验',
    images: [
      {
        url: 'https://r2.haydenbi.com/logo/logo.png',
        width: 548,
        height: 698,
        alt: 'HaydenBi - 博客',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'HaydenBi Blog',
    description: '分享前端、后端、全栈开发技术见解，记录项目实践与成长历程，探索独立开发与出海产品经验',
    creator: '@HaydenBi',
    images: ['https://r2.haydenbi.com/logo/logo.png'],
  },
  alternates: {
    types: {
      'application/rss+xml': [
        {
          title: 'HaydenBi Blog RSS Feed',
          url: '/feed.xml',
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
    name: 'HaydenBi',
    description: '分享技术见解，记录成长历程，探索未知领域',
    url: baseUrl,
    author: {
      '@type': 'Person',
      name: 'Bi',
      url: baseUrl,
    },
    publisher: {
      '@type': 'Organization',
      name: 'HaydenBi',
      logo: {
        '@type': 'ImageObject',
        url: `${baseUrl}/logo.png`,
      },
    },
  }

  return (
    <html lang="zh-CN" suppressHydrationWarning>
      <head>
        {/* IndexNow  */}
        <meta name="IndexNow" content="963011ef5f7746e2b680d9492f292702" />
      </head>
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
