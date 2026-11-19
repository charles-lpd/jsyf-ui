import React from "react";
import ReactDOM from "react-dom/client";

import { Button } from "@charles-d/react";
import "./styles.css";

function App() {
  return (
    <main className="mx-auto flex min-h-screen max-w-5xl flex-col gap-10 px-6 py-16">
      <header className="space-y-3">
        <p className="text-sm font-medium text-muted-foreground">
          @charles-d/react
        </p>
        <h1 className="text-4xl font-semibold">组件文档</h1>
        <p className="max-w-2xl text-muted-foreground">
          文档应用只维护 API、示例、可访问性说明与设计规范，不承载业务页面逻辑。
        </p>
      </header>
      <section className="space-y-4 border-t pt-8">
        <h2 className="text-2xl font-semibold">Button</h2>
        <div className="flex flex-wrap gap-3">
          <Button>默认按钮</Button>
          <Button variant="secondary">次要按钮</Button>
          <Button variant="outline">描边按钮</Button>
          <Button loading>处理中</Button>
        </div>
      </section>
    </main>
  );
}

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);
