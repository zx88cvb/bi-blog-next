---
title: "Tailwind CSS 实用技巧"
date: "2025-07-12"
excerpt: "分享一些 Tailwind CSS 的实用技巧和最佳实践，帮助你更高效地使用这个优秀的 CSS 框架。"
tags: ["Tailwind CSS", "CSS", "前端", "样式"]
author: "Bi"
---

# Tailwind CSS 是一个功能优先的 CSS 框架，这里分享一些实用的技巧。

Tailwind CSS 是一个功能优先的 CSS 框架，这里分享一些实用的技巧。

## 响应式设计

Tailwind 提供了简洁的响应式设计语法：

```html
<div class="w-full md:w-1/2 lg:w-1/3">
  响应式容器
</div>
```

### 断点说明

- `sm`: 640px 及以上
- `md`: 768px 及以上  
- `lg`: 1024px 及以上
- `xl`: 1280px 及以上
- `2xl`: 1536px 及以上

## 自定义配置

### 扩展颜色

```javascript
// tailwind.config.js
module.exports = {
  theme: {
    extend: {
      colors: {
        brand: {
          50: '#eff6ff',
          500: '#3b82f6',
          900: '#1e3a8a',
        }
      }
    }
  }
}
```

### 自定义字体

```javascript
module.exports = {
  theme: {
    extend: {
      fontFamily: {
        'sans': ['Inter', 'ui-sans-serif', 'system-ui'],
        'mono': ['Fira Code', 'ui-monospace'],
      }
    }
  }
}
```

## 实用组件

### 卡片组件

```html
<div class="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
  <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-2">
    卡片标题
  </h3>
  <p class="text-gray-600 dark:text-gray-300">
    卡片内容描述
  </p>
</div>
```

### 按钮组件

```html
<button class="bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 px-4 rounded-md transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2">
  点击按钮
</button>
```

## 暗色模式

启用暗色模式：

```javascript
// tailwind.config.js
module.exports = {
  darkMode: 'class',
  // ...
}
```

使用暗色模式类：

```html
<div class="bg-white dark:bg-gray-900 text-gray-900 dark:text-white">
  支持暗色模式的内容
</div>
```

## 性能优化

### JIT 模式

Tailwind CSS 3.0+ 默认使用 JIT（Just-In-Time）编译：

```javascript
module.exports = {
  mode: 'jit',
  purge: ['./src/**/*.{js,ts,jsx,tsx}'],
  // ...
}
```

### 移除未使用的样式

```javascript
module.exports = {
  content: [
    './src/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  // ...
}
```

## 总结

Tailwind CSS 提供了强大而灵活的工具集，通过这些技巧可以更高效地构建现代化的用户界面。记住要善用文档和配置选项来满足项目需求。