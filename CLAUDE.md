# CSP Coach 项目配置

## 技术栈

Vue 3 + TypeScript + Vite + Pinia + Vue Router + UnoCSS

## 开发规则

- 所有组件使用 `<script setup lang="ts">`
- 类型导入使用 `import type { ... }`
- UnoCSS 图标前缀：`i-lucide-*`
- Store 数据持久化：使用 `localStorage`，key 前缀 `csp-coach-*`
- 路由使用 Hash 模式，兼容静态部署
- 深色/浅色模式通过 `app.darkMode` 全局控制，组件用条件 class 绑定

## 数据文件

静态数据放在 `src/data/` 下，以导出 const 数组/对象的形式供视图消费。

## 颜色系统

基于 UnoCSS theme 自定义：
- `brand-*`：主题色（蓝色系）
- `surface-*`：背景/文字（明暗两套）

## 构建

```bash
npm run build   # 输出到 dist/
npm run dev     # 本地开发
```
