import React from "react";
import ReactDOM from "react-dom/client";

import {
  Badge,
  Button,
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
  Checkbox,
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  Field,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
  Input,
  Label,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
  Separator,
  Switch,
  Textarea,
} from "@charles-d/react";
import "./styles.css";

function App() {
  return (
    <main className="mx-auto min-h-screen max-w-5xl space-y-10 p-6 md:p-10">
      <header className="space-y-2">
        <Badge variant="secondary">@charles-d/react</Badge>
        <h1 className="text-3xl font-semibold">P0 组件实验场</h1>
        <p className="text-muted-foreground">
          用于验证基础表单、展示组件和 Radix 交互。
        </p>
      </header>

      <Separator />

      <Card>
        <CardHeader>
          <CardTitle>基础表单</CardTitle>
          <CardDescription>
            Input、Label、Textarea、Select、Checkbox 与 Switch。
          </CardDescription>
        </CardHeader>
        <CardContent>
          <FieldGroup>
            <Field>
              <FieldLabel htmlFor="playground-name" required>
                名称
              </FieldLabel>
              <Input id="playground-name" placeholder="请输入名称" />
              <FieldDescription>名称将用于组件示例展示。</FieldDescription>
            </Field>

            <Field>
              <FieldLabel htmlFor="playground-description">描述</FieldLabel>
              <Textarea id="playground-description" placeholder="请输入描述" />
              <FieldError errors={[{ message: "错误信息示例" }]} />
            </Field>

            <Field>
              <FieldLabel htmlFor="playground-framework">框架</FieldLabel>
              <Select defaultValue="react">
                <SelectTrigger id="playground-framework">
                  <SelectValue placeholder="请选择框架" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="react">React</SelectItem>
                  <SelectItem value="vue">Vue</SelectItem>
                  <SelectItem value="web-components">Web Components</SelectItem>
                </SelectContent>
              </Select>
            </Field>

            <div className="flex flex-wrap items-center gap-6">
              <Label className="gap-2">
                <Checkbox defaultChecked />
                接收更新通知
              </Label>
              <Label className="gap-2">
                <Switch defaultChecked />
                启用实验功能
              </Label>
            </div>
          </FieldGroup>
        </CardContent>
        <CardFooter className="justify-end gap-3">
          <Button asChild disabled>
            <a href="#disabled-link-target">禁用链接</a>
          </Button>
          <Button variant="outline">取消</Button>
          <Button>保存</Button>
        </CardFooter>
      </Card>

      <section className="space-y-4">
        <h2 className="text-xl font-semibold">状态与弹窗</h2>
        <div className="flex flex-wrap gap-2">
          <Badge>默认</Badge>
          <Badge variant="success">成功</Badge>
          <Badge variant="warning">警告</Badge>
          <Badge variant="info">信息</Badge>
          <Badge variant="destructive">错误</Badge>
        </div>
        <Dialog>
          <DialogTrigger asChild>
            <Button variant="secondary">打开 Dialog</Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>确认操作</DialogTitle>
              <DialogDescription>
                这是基础 Dialog 组件的交互与样式验证。
              </DialogDescription>
            </DialogHeader>
            <DialogFooter>
              <Button variant="outline">取消</Button>
              <Button>确认</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </section>
    </main>
  );
}

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);
