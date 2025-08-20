---
title: "NextJS接入Google Analytics方法"
date: "2025-08-20"
excerpt: "NextJS接入Google Analytics方法,首先安装@next/third-parties 执行 npm install @next/third-parties"
tags: ["Next.js", "前端开发", "Google Analytics"]
author: "Bi"
---

# 1. 安装 npm install @next/third-parties

执行npm安装命令
```bash
    npm install @next/third-parties
```
# 2. 引入GoogleAnalytics组件

一般在app下的layout.tsx中引入

```ts
import { GoogleAnalytics } from '@next/third-parties/google';
```

加入GoogleAnalytics代码并且控制只在生产环境使用

```ts
// 仅在生产环境启用GoogleAnalytics
    const GA_ENABLED = process.env.NODE_ENV === 'production';
    return (
      <html lang="en">
        <body>{children}</body>
        {/* Google Analytics - 仅在生产环境启用 */}
        {GA_ENABLED && <GoogleAnalytics gaId="your gaID" />}
      </html>
    );
```

# 3. 检查接入是否成功

## 3.1. 通过F12查看

项目部署到生产环境后进去页面，通过F12查看

![](https://p0-xtjj-private.juejin.cn/tos-cn-i-73owjymdk6/304e336682e14e589be66642a709585a~tplv-73owjymdk6-jj-mark-v1:0:0:0:0:5o6Y6YeR5oqA5pyv56S-5Yy6IEAgQmk=:q75.awebp?policy=eyJ2bSI6MywidWlkIjoiODUyODc2NzU2Mjc0NzQ5In0%3D&rk3s=f64ab15b&x-orig-authkey=f32326d3454f2ac7e96d3d06cdbb035152127018&x-orig-expires=1756259038&x-orig-sign=l5w3Nzxj74yOG6VXTOJwLevgRdM%3D)

如果有图中的代码则表示Google Analytics代码已经成功加入到项目中，一般这段代码会在最末尾

## 3.2. 登录Google Analytics查看是否有访问数据

![](https://p0-xtjj-private.juejin.cn/tos-cn-i-73owjymdk6/0c94c13591f64f51929df7f57fd01cf0~tplv-73owjymdk6-jj-mark-v1:0:0:0:0:5o6Y6YeR5oqA5pyv56S-5Yy6IEAgQmk=:q75.awebp?policy=eyJ2bSI6MywidWlkIjoiODUyODc2NzU2Mjc0NzQ5In0%3D&rk3s=f64ab15b&x-orig-authkey=f32326d3454f2ac7e96d3d06cdbb035152127018&x-orig-expires=1756259038&x-orig-sign=bCZU04mEmRaFrLyR1gDNN1R%2BFTw%3D)

如图所示,刚刚访问过后会在**过去 30 分钟的活跃用户数** 中显示数据

也可以通过左侧菜单的实时概览进行查看

![](https://p0-xtjj-private.juejin.cn/tos-cn-i-73owjymdk6/30fb6b9f0cfa40739352a8398a004a96~tplv-73owjymdk6-jj-mark-v1:0:0:0:0:5o6Y6YeR5oqA5pyv56S-5Yy6IEAgQmk=:q75.awebp?policy=eyJ2bSI6MywidWlkIjoiODUyODc2NzU2Mjc0NzQ5In0%3D&rk3s=f64ab15b&x-orig-authkey=f32326d3454f2ac7e96d3d06cdbb035152127018&x-orig-expires=1756259038&x-orig-sign=ZHC9CM5dZXMH2LVWeYuKDCOcQ8E%3D)

好了,以上就是NextJS接入Google Analytics接入的全过程，希望对你有所帮助
