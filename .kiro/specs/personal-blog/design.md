# Design Document: Personal Blog

## Overview

本设计文档描述如何构建一个现代化、优雅的个人博客系统。博客基于 Jekyll 静态站点生成器，托管在 GitHub Pages 上，并集成 Decap CMS（原 Netlify CMS）实现网页端内容管理。

### 技术选型

| 组件 | 技术方案 | 理由 |
|------|----------|------|
| 静态站点生成器 | Jekyll | GitHub Pages 原生支持 |
| 托管平台 | GitHub Pages | 免费、稳定、与 Git 集成 |
| CMS | Decap CMS | 开源、支持 GitHub OAuth、功能完善 |
| 样式方案 | 自定义 CSS/SCSS | 完全控制视觉设计 |
| 代码高亮 | Rouge (Jekyll 内置) | GitHub Pages 支持 |

## Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                      GitHub Repository                       │
├─────────────────────────────────────────────────────────────┤
│  ┌──────────┐  ┌──────────┐  ┌──────────┐  ┌──────────┐    │
│  │ _posts/  │  │ _layouts/│  │ _includes│  │  assets/ │    │
│  │ 文章     │  │ 布局模板 │  │ 组件     │  │ CSS/JS   │    │
│  └──────────┘  └──────────┘  └──────────┘  └──────────┘    │
│                                                              │
│  ┌──────────┐  ┌──────────┐  ┌──────────┐                  │
│  │  admin/  │  │ _config  │  │  pages/  │                  │
│  │ CMS配置  │  │ Jekyll   │  │ 静态页面 │                  │
│  └──────────┘  └──────────┘  └──────────┘                  │
└─────────────────────────────────────────────────────────────┘
                           │
                           ▼
┌─────────────────────────────────────────────────────────────┐
│                     GitHub Pages Build                       │
│                    (Jekyll 自动构建)                         │
└─────────────────────────────────────────────────────────────┘
                           │
                           ▼
┌─────────────────────────────────────────────────────────────┐
│                    https://nissoncx.github.io               │
│  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐         │
│  │   首页      │  │   博客列表   │  │   /admin    │         │
│  │   /         │  │   /blog     │  │   CMS入口   │         │
│  └─────────────┘  └─────────────┘  └─────────────┘         │
└─────────────────────────────────────────────────────────────┘
```

## Components and Interfaces

### 1. 目录结构

```
NissonCX.github.io/
├── _config.yml           # Jekyll 配置
├── _layouts/             # 页面布局模板
│   ├── default.html      # 基础布局
│   ├── home.html         # 首页布局
│   ├── post.html         # 文章详情布局
│   └── page.html         # 通用页面布局
├── _includes/            # 可复用组件
│   ├── header.html       # 导航头部
│   ├── footer.html       # 页脚
│   ├── head.html         # HTML head
│   ├── toc.html          # 文章目录
│   └── post-card.html    # 文章卡片
├── _posts/               # 博客文章
├── _sass/                # SCSS 样式源文件
│   ├── _variables.scss   # 变量定义
│   ├── _base.scss        # 基础样式
│   ├── _layout.scss      # 布局样式
│   ├── _components.scss  # 组件样式
│   └── _syntax.scss      # 代码高亮
├── assets/
│   ├── css/
│   │   └── main.scss     # 主样式入口
│   ├── js/
│   │   └── main.js       # JavaScript
│   └── images/           # 图片资源
├── admin/                # Decap CMS
│   ├── index.html        # CMS 入口
│   └── config.yml        # CMS 配置
├── index.html            # 首页
├── blog.html             # 博客列表页
├── about.md              # 关于页面
└── projects.md           # 项目页面
```

### 2. 布局组件接口

#### default.html (基础布局)
```html
<!DOCTYPE html>
<html lang="zh-CN" data-theme="light">
<head>
  {% include head.html %}
</head>
<body>
  {% include header.html %}
  <main class="main-content">
    {{ content }}
  </main>
  {% include footer.html %}
  <script src="/assets/js/main.js"></script>
</body>
</html>
```

#### header.html (导航组件)
- 输入: site.navigation (导航配置)
- 输出: 响应式导航栏 HTML
- 功能: 固定顶部、移动端汉堡菜单、深色模式切换按钮

#### post-card.html (文章卡片组件)
- 输入: post 对象 (title, date, excerpt, categories, url)
- 输出: 文章预览卡片 HTML

### 3. Decap CMS 配置接口

```yaml
# admin/config.yml
backend:
  name: github
  repo: NissonCX/NissonCX.github.io
  branch: main

media_folder: "assets/images/uploads"
public_folder: "/assets/images/uploads"

collections:
  - name: "posts"
    label: "博客文章"
    folder: "_posts"
    create: true
    slug: "{{year}}-{{month}}-{{day}}-{{slug}}"
    fields:
      - {label: "布局", name: "layout", widget: "hidden", default: "post"}
      - {label: "标题", name: "title", widget: "string"}
      - {label: "发布日期", name: "date", widget: "datetime"}
      - {label: "分类", name: "categories", widget: "list"}
      - {label: "标签", name: "tags", widget: "list"}
      - {label: "内容", name: "body", widget: "markdown"}
```

## Data Models

### Post (文章)
```yaml
---
layout: post
title: string          # 文章标题
date: datetime         # 发布时间
categories: string[]   # 分类列表
tags: string[]         # 标签列表
excerpt: string        # 摘要（可选，自动生成）
toc: boolean           # 是否显示目录（默认 true）
---
content: markdown      # 文章正文
```

### Site Configuration (_config.yml)
```yaml
title: string              # 站点标题
description: string        # 站点描述
author:
  name: string             # 作者名
  bio: string              # 简介
  avatar: string           # 头像路径
  email: string            # 邮箱
  github: string           # GitHub 用户名
  csdn: string             # CSDN 链接
navigation:                # 导航菜单
  - title: string
    url: string
social_links:              # 社交链接
  - platform: string
    url: string
    icon: string
```

### Theme Variables (_sass/_variables.scss)
```scss
// 颜色系统
$color-primary: #6366f1;      // 主色调 (靛蓝)
$color-secondary: #8b5cf6;    // 次要色 (紫色)
$color-accent: #06b6d4;       // 强调色 (青色)

// 浅色模式
$light-bg: #ffffff;
$light-text: #1f2937;
$light-text-secondary: #6b7280;
$light-border: #e5e7eb;
$light-card-bg: #f9fafb;

// 深色模式
$dark-bg: #0f172a;
$dark-text: #f1f5f9;
$dark-text-secondary: #94a3b8;
$dark-border: #334155;
$dark-card-bg: #1e293b;

// 字体
$font-sans: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
$font-mono: 'JetBrains Mono', 'Fira Code', monospace;

// 断点
$breakpoint-mobile: 768px;
$breakpoint-tablet: 1024px;
```

## Correctness Properties

*A property is a characteristic or behavior that should hold true across all valid executions of a system—essentially, a formal statement about what the system should do. Properties serve as the bridge between human-readable specifications and machine-verifiable correctness guarantees.*

由于本项目是静态博客系统，主要涉及 UI 渲染和配置，大部分验收标准属于视觉/交互测试，不适合自动化属性测试。以下是可测试的属性：

### Property 1: 响应式断点一致性
*For any* 页面，当视口宽度 < 768px 时，导航菜单应显示为汉堡菜单形式
**Validates: Requirements 2.3**

### Property 2: 深色模式切换完整性
*For any* 主题切换操作，所有页面元素的颜色应同步更新为对应主题的配色
**Validates: Requirements 1.2**

### Property 3: 文章列表完整性
*For any* `_posts` 目录中的有效 Markdown 文件，都应出现在博客列表页中
**Validates: Requirements 4.1**

### Property 4: CMS 发布一致性
*For any* 通过 CMS 创建的文章，保存后应在 `_posts` 目录生成符合 Jekyll 命名规范的文件
**Validates: Requirements 7.3**

## Error Handling

### 1. 页面加载错误
- 404 页面: 创建自定义 404.html，提供友好的错误提示和导航链接
- 资源加载失败: CSS/JS 使用内联关键样式作为降级方案

### 2. CMS 认证错误
- GitHub OAuth 失败: 显示清晰的错误信息和重试按钮
- 权限不足: 提示用户检查仓库访问权限

### 3. 内容渲染错误
- Markdown 解析失败: Jekyll 构建时会报错，通过 GitHub Actions 通知
- 图片加载失败: 使用 CSS 占位符显示默认图片

## Testing Strategy

### 手动测试
由于是静态博客，主要通过手动测试验证：
1. 响应式布局: 在不同设备/浏览器测试
2. 深色模式: 验证所有页面的主题切换
3. CMS 功能: 测试文章创建、编辑、发布流程
4. 导航功能: 验证所有链接正确跳转

### 自动化检查
1. HTML 验证: 使用 W3C Validator 检查生成的 HTML
2. 链接检查: 使用 html-proofer 检查死链
3. Lighthouse: 检查性能、可访问性、SEO 分数

### 构建验证
```bash
# 本地构建测试
bundle exec jekyll build
bundle exec htmlproofer ./_site --disable-external
```
