# Implementation Plan: Personal Blog

## Overview

基于 Jekyll 构建现代化个人博客，使用自定义 SCSS 样式和 Decap CMS 实现网页端内容管理。实现将按照：基础配置 → 样式系统 → 布局模板 → 页面内容 → CMS 集成的顺序进行。

## Tasks

- [x] 1. 更新 Jekyll 配置和项目结构
  - [x] 1.1 更新 _config.yml 配置文件
    - 移除 hacker 主题，改用自定义样式
    - 添加作者信息、导航配置、社交链接
    - 配置 kramdown 和代码高亮
    - _Requirements: 1.1, 5.1, 8.2_
  - [x] 1.2 创建项目目录结构
    - 创建 _layouts、_includes、_sass、assets 目录
    - 创建 admin 目录用于 CMS
    - _Requirements: 全部_

- [x] 2. 实现 SCSS 样式系统
  - [x] 2.1 创建样式变量文件 _sass/_variables.scss
    - 定义颜色系统（浅色/深色模式）
    - 定义字体、间距、断点变量
    - _Requirements: 1.1, 1.2_
  - [x] 2.2 创建基础样式 _sass/_base.scss
    - 重置样式、基础排版
    - 链接、按钮基础样式
    - _Requirements: 1.3_
  - [x] 2.3 创建布局样式 _sass/_layout.scss
    - 响应式网格系统
    - 容器、页面布局
    - _Requirements: 2.1, 2.2_
  - [x] 2.4 创建组件样式 _sass/_components.scss
    - 导航栏、卡片、标签、按钮
    - 深色模式切换按钮
    - _Requirements: 1.2, 2.3, 2.4_
  - [x] 2.5 创建代码高亮样式 _sass/_syntax.scss
    - Rouge 语法高亮主题
    - 代码块样式
    - _Requirements: 4.5_
  - [x] 2.6 创建主样式入口 assets/css/main.scss
    - 导入所有 SCSS 模块
    - _Requirements: 1.5_

- [x] 3. 实现布局模板
  - [x] 3.1 创建 _includes/head.html
    - HTML head 部分，meta 标签、CSS 引入
    - SEO 相关标签
    - _Requirements: 8.1, 8.2_
  - [x] 3.2 创建 _includes/header.html
    - 响应式导航栏
    - 深色模式切换按钮
    - 移动端汉堡菜单
    - _Requirements: 5.1, 5.2, 5.3, 2.3, 1.2_
  - [x] 3.3 创建 _includes/footer.html
    - 社交媒体链接
    - 版权信息
    - _Requirements: 5.4_
  - [x] 3.4 创建 _layouts/default.html
    - 基础页面结构
    - 引入 header、footer
    - _Requirements: 1.5_
  - [x] 3.5 创建 _layouts/home.html
    - 首页布局
    - Hero 区域、技术栈、最新文章、项目展示
    - _Requirements: 3.1, 3.2, 3.3, 3.4_
  - [x] 3.6 创建 _layouts/post.html
    - 文章详情布局
    - 标题、日期、阅读时间、目录、内容
    - _Requirements: 4.3, 4.4_
  - [x] 3.7 创建 _layouts/page.html
    - 通用页面布局
    - _Requirements: 6.1_

- [x] 4. 创建 JavaScript 功能
  - [x] 4.1 创建 assets/js/main.js
    - 深色模式切换逻辑
    - 移动端菜单切换
    - 目录导航高亮
    - _Requirements: 1.2, 2.3, 4.4_

- [x] 5. Checkpoint - 验证样式和布局
  - 本地运行 Jekyll 验证样式正确加载
  - 测试响应式布局和深色模式
  - 确保所有模板正确渲染

- [x] 6. 创建页面内容
  - [x] 6.1 更新 index.html 首页
    - 使用 home 布局
    - 个人介绍、技术栈、最新文章、项目
    - _Requirements: 3.1, 3.2, 3.3, 3.4, 3.5_
  - [x] 6.2 创建 blog.html 博客列表页
    - 文章列表展示
    - 分类筛选功能
    - _Requirements: 4.1, 4.2_
  - [x] 6.3 更新 about.md 关于页面
    - 详细个人介绍
    - 技能列表、时间线
    - _Requirements: 6.1, 6.2, 6.3, 6.4_
  - [x] 6.4 创建 projects.md 项目页面
    - 项目展示列表
    - _Requirements: 3.4_
  - [x] 6.5 创建 404.html 错误页面
    - 友好的 404 提示
    - _Requirements: Error Handling_

- [x] 7. 集成 Decap CMS
  - [x] 7.1 创建 admin/index.html
    - CMS 入口页面
    - 引入 Decap CMS 脚本
    - _Requirements: 7.1_
  - [x] 7.2 创建 admin/config.yml
    - 配置 GitHub backend
    - 定义文章 collection 和字段
    - 配置媒体文件夹
    - _Requirements: 7.2, 7.3, 7.4, 7.5, 7.6_

- [x] 8. 优化和完善
  - [x] 8.1 添加 RSS feed 支持
    - 确保 jekyll-feed 插件正确配置
    - _Requirements: 8.4_
  - [x] 8.2 添加 sitemap
    - 配置 jekyll-sitemap 插件
    - _Requirements: 8.2_
  - [x] 8.3 优化图片加载
    - 添加 lazy loading
    - _Requirements: 8.3_

- [x] 9. Final Checkpoint - 完整测试
  - 本地构建测试 `bundle exec jekyll build`
  - 测试所有页面和功能
  - 测试 CMS 登录和文章发布
  - 验证响应式布局在不同设备上的表现

## Notes

- 由于 GitHub Pages 限制，使用 Decap CMS 需要配置 GitHub OAuth App
- 用户需要在 GitHub 创建 OAuth App 并配置 Client ID
- 本地测试 CMS 需要运行 `npx netlify-cms-proxy-server`
- 所有样式使用 SCSS 编写，Jekyll 会自动编译为 CSS
