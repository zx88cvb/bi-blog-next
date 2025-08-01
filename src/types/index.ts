export interface BlogPost {
  id: string
  title: string
  excerpt: string
  content: string
  author: string
  publishDate: string
  tags: string[]
  slug: string
  readTime: string
  coverImage?: string
}

export interface Author {
  name: string
  bio: string
  avatar: string
  social: {
    twitter?: string
    github?: string
    email?: string
  }
}

export interface Milestone {
  id: string
  title: string
  description: string
  date: string
  type: 'personal' | 'work' | 'project'
}

export interface Friend {
  id: string
  name: string
  description: string
  url: string
  avatar?: string
}

export interface PaginationInfo {
  currentPage: number
  totalPages: number
  hasMore: boolean
}