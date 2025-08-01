import { clsx, type ClassValue } from 'clsx'

export function cn(...inputs: ClassValue[]) {
  return clsx(inputs)
}

export function formatDate(date: string | Date): string {
  try {
    // 如果已经是Date对象，直接使用
    const dateObj = date instanceof Date ? date : new Date(date)
    
    // 检查日期是否有效
    if (isNaN(dateObj.getTime())) {
      console.warn('Invalid date:', date)
      return String(date) // 返回原始字符串
    }
    
    return new Intl.DateTimeFormat('zh-CN', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    }).format(dateObj)
  } catch (error) {
    console.error('Error formatting date:', error, 'Original date:', date)
    return String(date) // 返回原始字符串作为后备
  }
}

export function truncateText(text: string, length: number = 150): string {
  if (text.length <= length) return text
  return text.slice(0, length) + '...'
}