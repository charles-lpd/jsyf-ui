# 多框架 UI 组件库架构

## 1. 技术选型

使用 pnpm workspace + Turborepo。该仓库的核心问题是多个包之间的依赖拓扑、增量构建、缓存和并行任务；Turborepo 足够轻量，且不会引入 Nx 的 executor、generator 和额外项目模型。只有未来需要强制模块边界、复杂代码生成器或超大规模 affected CI 时，才建议迁移 Nx。

## 2. 完整目录树

```text
hadabridge-ui-monorepo/
├── .changeset/
│   └── config.json
├── apps/
│   ├── docs/
│   │   ├── src/main.tsx
│   │   ├── package.json
│   │   ├── tsconfig.json
│   │   └── vite.config.ts
│   └── playground/
│       ├── src/main.tsx
│       ├── package.json
│       ├── tsconfig.json
│       └── vite.config.ts
├── packages/
│   ├── core/
│   │   ├── src/{index.ts,types.ts}
│   │   └── package.json
│   ├── tokens/
│   │   ├── src/{index.ts,tokens.ts}
│   │   ├── styles.css
│   │   └── package.json
│   ├── react/
│   │   ├── src/
│   │   │   ├── components/
│   │   │   │   ├── button/{button.tsx,index.ts}
│   │   │   │   └── index.ts
│   │   │   ├── lib/cn.ts
│   │   │   └── index.ts
│   │   ├── styles.css
│   │   └── package.json
│   ├── vue/                    # 私有占位，暂不发布
│   ├── native/                 # 私有占位，暂不发布
│   └── web-components/         # 私有占位，暂不发布
├── tooling/
│   ├── eslint-config/
│   └── typescript-config/
├── package.json
├── pnpm-workspace.yaml
├── tsconfig.json
└── turbo.json
```

## 3. 包边界与依赖方向

```text
@charles-d/tokens ─┬─> @charles-d/react ─> docs / playground
                    ├─> @charles-d/vue
                    ├─> @charles-d/native
@charles-d/core ───┴─> @charles-d/web-components
```

- `@charles-d/tokens`：平台令牌，提供 TypeScript 常量和 CSS Variables。
- `@charles-d/core`：不依赖框架、DOM 或 CSS 的类型、状态与纯函数。
- `@charles-d/react`：React Props、Radix 组合、CVA 变体、Lucide 图标和 `cn`。
- `apps/*`：只负责文档与开发验证，不向组件包反向输出业务代码。
- `tooling/*`：只服务仓库开发，不发布到 npm。

## 4. 包命名规范

| 类型 | 包名 | 发布状态 |
| --- | --- | --- |
| 设计令牌 | `@charles-d/tokens` | 公开 |
| 框架无关契约 | `@charles-d/core` | 公开 |
| React | `@charles-d/react` | 公开 |
| Vue 3 | `@charles-d/vue` | 暂时 private |
| Native | `@charles-d/native` | 暂时 private |
| Web Components | `@charles-d/web-components` | 暂时 private |

如果最终 Native 明确只支持 React Native，应在首次公开发布前将包名收敛为 `@charles-d/react-native`，避免发布后再做破坏性更名。

## 5. 发布包配置原则

- 每个公开包有独立 `package.json`、版本号、`files`、`exports`、声明文件和 `publishConfig`。
- React、React DOM、Tailwind CSS 放在 `peerDependencies`，避免宿主重复运行时。
- Radix UI、CVA、Lucide、`clsx`、`tailwind-merge` 是 React 实现细节，放在 `dependencies`。
- ESM 包使用显式 `.js` 内部导入，保证 Node ESM 与现代构建器一致。
- `sideEffects` 只保留 CSS，JavaScript 可被 tree-shaking。
- 根入口提供统一导出，`@charles-d/react/button` 提供按组件导入。

## 6. React 包内部结构

```text
src/
├── components/
│   ├── button/
│   │   ├── button.tsx         # Radix + CVA + React Props
│   │   └── index.ts           # 组件公开 API
│   └── index.ts               # 组件层 barrel
├── lib/
│   └── cn.ts                  # clsx + tailwind-merge
└── index.ts                   # 包级公开 API
```

组件默认以同名目录组织，测试、示例和专属类型可就近放置。只有承诺兼容的 API 才从根入口导出；内部 helper 不应意外成为公共 API。

## 7. 后续扩展方式

### Vue

解除 `packages/vue` 的 `private`，增加 Vue 3 peer dependency、构建配置与 `src/index.ts`。交互原语优先使用 Reka UI。与 React 共享 token 名称、variant 名称和无障碍标准，但不共享 JSX 或组件源码。

### Native

直接使用 `@charles-d/tokens` 的 TypeScript 对象映射到 StyleSheet 或目标平台样式系统。不得依赖 CSS、DOM、Radix UI 或 Tailwind Web 插件。

### Web Components

使用 CSS Variables 作为主题协议，选择 Shadow DOM 或明确的 light DOM 策略。跨框架事件名、状态名和属性语义应沉淀在 `@charles-d/core`。

## 8. 开发、构建与发布

```bash
# 安装
pnpm install

# 首次构建公开包后，同时启动包 watch、docs 与 playground
pnpm dev

# 构建所有 workspace
pnpm build

# 局部质量校验
pnpm lint
pnpm check-types

# 创建版本变更记录
pnpm changeset

# 消费 changeset，更新各包独立版本与 changelog
pnpm version-packages

# 校验、构建并按依赖顺序发布
pnpm release
```

CI 建议分为三段：PR 执行 lint/typecheck/build；主分支由 Changesets 生成版本 PR；版本 PR 合并后执行 npm provenance 发布。

## 9. 约束

- 组件包不包含接口请求、路由、页面布局、领域模型和业务状态。
- 框架实现包之间不互相依赖。
- tokens 和 core 的变更需要评估所有框架实现。
- 不为未来假设提前抽象组件；先沉淀稳定 token 和跨框架语义。
