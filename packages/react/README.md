# @charles-d/react

React 实现层。使用 Radix UI 处理交互与无障碍语义，CVA 管理变体，`cn` 合并 Tailwind CSS 类名。

```tsx
import { Button } from "@charles-d/react";
import { Button as DirectButton } from "@charles-d/react/button";
import "@charles-d/react/styles.css";
```

`@charles-d/react/styles.css` 已经包含组件所需的 `tw-animate-css` 动画样式。使用者只需要安装 `@charles-d/react` 并引入这个样式入口，不需要单独安装或导入 `tw-animate-css`。

已有 Tailwind CSS 4 的应用建议直接引入主题入口，避免重复引入 Preflight；该入口提供设计令牌、组件 class 扫描和浮层动画，不重置宿主全局元素：

```css
@import "tailwindcss";
@import "@charles-d/react/theme.css";
```

`styles.css` 是开箱即用的兼容入口，包含 Tailwind 和 Preflight。Next.js App Router 中的交互组件（如 Dialog、Select、Checkbox、Switch）已声明客户端边界；事件处理、状态和回调应在 Client Component 中使用。

当前基础组件包括：

- `Button`
- `Input`
- `Label`
- `Textarea`
- `Card`
- `Checkbox`
- `Switch`
- `Select`
- `Dialog`
- `Field`
- `Badge`
- `Separator`

所有组件既可以从根入口导入，也可以按组件子路径导入：

```tsx
import { Field, FieldLabel, Input } from "@charles-d/react";
import { Select, SelectItem } from "@charles-d/react/select";
```
