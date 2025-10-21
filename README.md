# Happy Table

A high-performance Vue 3 data grid component library built with a modern Monorepo architecture.

## 🏗️ Monorepo Structure

This project uses **pnpm workspaces** for package management:

```
packages/
├── core/           # @happy-table/core - Component library
└── demo/           # @happy-table/demo - Demo application
```

## 🚀 Quick Start

### Development

```bash
# Install dependencies
pnpm install

# Start demo dev server (port 3300)
pnpm dev

# Build core library
pnpm build:core

# Build all packages
pnpm build
```

### Package Management

```bash
# Add dependency to core library
pnpm --filter @happy-table/core add <package>

# Add dependency to demo app
pnpm --filter @happy-table/demo add <package>
```

## 📚 Documentation

- **[Sorting Configuration Guide](./manual/sorting-configuration-guide.md)** - Complete guide for sorting functionality
- **[MONOREPO_MIGRATION.md](./MONOREPO_MIGRATION.md)** - Monorepo migration guide and structure
- **[GitHub Protection Strategy](./docs/GITHUB_PROTECTION_STRATEGY.md)** - Repository protection and publishing strategy
- **[CLAUDE.md](./CLAUDE.md)** - Development guidelines for contributors
- **[DESIGN_DOC.md](./DESIGN_DOC.md)** - Architectural design and feature specifications

## 🔒 Repository Strategy

本项目采用**双仓库架构**保护核心代码：

- **私有仓库**（本仓库）：完整源码，用于开发
- **公开仓库**：Demo + 预构建库，用于展示

详细策略请参阅 [GitHub Protection Strategy](./docs/GITHUB_PROTECTION_STRATEGY.md)。

---

## NPM 组件库最佳实践（Tailwind v4 + Vite + Monorepo）

本仓库已迁移至 **pnpm Monorepo** 架构，结合 Tailwind CSS v4 与 Vite，建议遵循以下实践：

- **目录结构**
  - 组件库代码：`packages/core/src/`
  - 组件库入口：`packages/core/src/index.ts`
  - 组件：`packages/core/src/components/*`
  - 库样式入口：
    - `packages/core/src/style.css`（仅 tokens）
    - `packages/core/src/auto.css`（tokens + utilities）
  - 演示应用：`packages/demo/src/`

- **Vite 构建**
  - 开发应用：`pnpm dev`（启动 demo，端口 3300）
  - 构建组件库：`pnpm build:core`（外部化 vue，输出 ESM/CJS 与类型）
  - 构建演示应用：`pnpm build:demo`
  - 构建所有包：`pnpm build`

- **package.json 配置**（`packages/core/package.json`）
  - `peerDependencies`: 将 `vue` 设为 peer 依赖，避免重复打包
  - `exports`: 指向 ESM/CJS 模块与类型声明
  - `exports["./style.css"]`: tokens-only CSS
  - `exports["./auto.css"]`: tokens + utilities CSS
  - `files`: 仅发布 `dist/**`
  - `sideEffects: ["**/*.css"]`: 保证样式不被 treeshake

- **使用方式（消费端）**
  - 安装：`npm i @happy-table/core`
  - 代码引入：
    - ESM：`import { DataGrid } from '@happy-table/core'`
    - 样式（两种模式二选一）：
      - Tailwind 工程：`import '@happy-table/core/style.css'`（仅 tokens；utilities 由工程生成）
      - 非 Tailwind 工程：`import '@happy-table/core/auto.css'`（tokens + utilities，开箱可用）
  - Tailwind v4 注意：消费端无需扫描 node_modules，本库产物已是纯 CSS。若需要主题扩展，可在应用侧自定义。

- **组件开发建议**
  - 尽量使用静态 Tailwind 类名，避免运行期拼接
  - 公共 API 从 `packages/core/src/index.ts` 导出，保证稳定命名
  - 内部 API 从 `packages/core/src/internal.ts` 导出（仅供插件使用）

- **发布建议**
  - 当前 `packages/core/package.json` 设为 `private: true` 避免误发包
  - 发布前移除 `private` 并设置正确包名与版本
  - 本地验证：`pnpm pack` 查看打包内容，确保 `dist/**` 与类型完整

---

# Vue 3 + TypeScript + Vite

This template should help get you started developing with Vue 3 and TypeScript in Vite. The template uses Vue 3 `<script setup>` SFCs, check out the [script setup docs](https://v3.vuejs.org/api/sfc-script-setup.html#sfc-script-setup) to learn more.

Learn more about the recommended Project Setup and IDE Support in the [Vue Docs TypeScript Guide](https://vuejs.org/guide/typescript/overview.html#project-setup).
