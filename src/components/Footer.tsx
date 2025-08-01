import Link from 'next/link'
import { Github, Twitter, Mail, Heart } from 'lucide-react'

const socialLinks = [
  {
    name: 'GitHub',
    href: 'https://github.com/zx88cvb',
    icon: Github,
  },
  {
    name: 'X',
    href: 'https://x.com/HaydenBi',
    icon: Twitter,
  },
  {
    name: 'Email',
    href: 'mailto:zx88cvb@gmail.com',
    icon: Mail,
  },
]

export default function Footer() {
  return (
    <footer className="bg-muted/50 border-t border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Logo and Description */}
          <div className="col-span-1 md:col-span-2">
            <Link href="/" className="text-2xl font-bold text-foreground hover:text-primary transition-colors">
              Bi Blog
            </Link>
            <p className="mt-4 text-sm text-muted-foreground max-w-md">
              分享技术见解，记录成长历程，探索未知领域。让我们一起在技术的道路上前行。
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-sm font-semibold text-foreground mb-4">快速链接</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/posts" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                  文章列表
                </Link>
              </li>
              <li>
                <Link href="/about" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                  关于我
                </Link>
              </li>
              <li>
                <Link href="/milestones" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                  里程碑
                </Link>
              </li>
              <li>
                <Link href="/friends" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                  友情链接
                </Link>
              </li>
            </ul>
          </div>

          {/* Social Links */}
          <div>
            <h3 className="text-sm font-semibold text-foreground mb-4">关注我</h3>
            <div className="flex space-x-3">
              {socialLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  className="p-2 rounded-lg bg-background hover:bg-accent transition-colors"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={link.name}
                >
                  <link.icon className="h-4 w-4" />
                </a>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t border-border">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-sm text-muted-foreground">
              © 2025 Bi Blog. All rights reserved.
            </p>
            <p className="text-sm text-muted-foreground mt-2 md:mt-0 flex items-center">
              Made with <Heart className="h-4 w-4 mx-1 text-red-500" /> using Next.js
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
}