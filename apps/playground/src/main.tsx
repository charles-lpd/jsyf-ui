import React from "react";
import ReactDOM from "react-dom/client";

import { Button } from "@hadabridge/react";
import "@hadabridge/react/styles.css";

function App() {
  return (
    <main className="grid min-h-screen place-items-center p-6">
      <div className="flex flex-col items-center gap-4">
        <h1 className="text-2xl font-semibold">组件实验场</h1>
        <Button>验证组件交互</Button>
      </div>
    </main>
  );
}

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
