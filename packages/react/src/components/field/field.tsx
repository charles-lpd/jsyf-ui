"use client";

import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "../../lib/cn.js";
import { Label, type LabelProps } from "../label/index.js";
import { Separator } from "../separator/index.js";

export function FieldSet({
  className,
  ...props
}: React.ComponentProps<"fieldset">) {
  return (
    <fieldset
      data-slot="field-set"
      className={cn("flex flex-col gap-6", className)}
      {...props}
    />
  );
}

export interface FieldLegendProps extends React.ComponentProps<"legend"> {
  variant?: "legend" | "label";
}

export function FieldLegend({
  className,
  variant = "legend",
  ...props
}: FieldLegendProps) {
  return (
    <legend
      data-slot="field-legend"
      data-variant={variant}
      className={cn(
        "font-medium data-[variant=label]:text-sm data-[variant=legend]:text-base",
        className,
      )}
      {...props}
    />
  );
}

export function FieldGroup({
  className,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="field-group"
      className={cn("flex w-full flex-col gap-4", className)}
      {...props}
    />
  );
}

export const fieldVariants = cva(
  "group/field flex w-full gap-2 data-[invalid=true]:text-destructive",
  {
    variants: {
      orientation: {
        vertical: "flex-col [&>*]:w-full [&>.sr-only]:w-auto",
        horizontal:
          "flex-row items-center [&>[data-slot=field-label]]:flex-auto",
        responsive:
          "flex-col [&>*]:w-full [&>.sr-only]:w-auto sm:flex-row sm:items-center sm:[&>*]:w-auto sm:[&>[data-slot=field-label]]:flex-auto",
      },
    },
    defaultVariants: {
      orientation: "vertical",
    },
  },
);

export interface FieldProps
  extends React.ComponentProps<"div">, VariantProps<typeof fieldVariants> {}

export function Field({
  className,
  orientation = "vertical",
  ...props
}: FieldProps) {
  return (
    <div
      role="group"
      data-slot="field"
      data-orientation={orientation}
      className={cn(fieldVariants({ className, orientation }))}
      {...props}
    />
  );
}

export function FieldContent({
  className,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="field-content"
      className={cn("flex flex-1 flex-col gap-1.5", className)}
      {...props}
    />
  );
}

export interface FieldLabelProps extends LabelProps {
  required?: boolean;
}

export function FieldLabel({
  className,
  required = false,
  ...props
}: FieldLabelProps) {
  return (
    <Label
      data-slot="field-label"
      data-required={required || undefined}
      className={cn(
        "w-fit data-[required=true]:after:ml-0.5 data-[required=true]:after:text-destructive data-[required=true]:after:content-['*']",
        className,
      )}
      {...props}
    />
  );
}

export function FieldTitle({
  className,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="field-title"
      className={cn("text-sm font-medium leading-snug", className)}
      {...props}
    />
  );
}

export function FieldDescription({
  className,
  ...props
}: React.ComponentProps<"p">) {
  return (
    <p
      data-slot="field-description"
      className={cn("text-sm text-muted-foreground", className)}
      {...props}
    />
  );
}

export interface FieldErrorProps extends React.ComponentProps<"div"> {
  errors?: Array<{ message?: string } | undefined>;
}

export function FieldError({
  children,
  className,
  errors,
  ...props
}: FieldErrorProps) {
  const messages = React.useMemo(
    () =>
      Array.from(
        new Set(
          errors?.flatMap((error) => (error?.message ? [error.message] : [])) ??
            [],
        ),
      ),
    [errors],
  );
  const content =
    children ??
    (messages.length === 1 ? (
      messages[0]
    ) : messages.length > 1 ? (
      <ul className="ml-4 list-disc space-y-1">
        {messages.map((message) => (
          <li key={message}>{message}</li>
        ))}
      </ul>
    ) : null);

  if (!content) {
    return null;
  }

  return (
    <div
      role="alert"
      data-slot="field-error"
      className={cn("text-sm text-destructive", className)}
      {...props}
    >
      {content}
    </div>
  );
}

export function FieldSeparator({
  children,
  className,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="field-separator"
      className={cn("relative flex h-5 items-center", className)}
      {...props}
    >
      <Separator className="absolute inset-x-0" />
      {children ? (
        <span className="relative mx-auto bg-background px-2 text-xs text-muted-foreground">
          {children}
        </span>
      ) : null}
    </div>
  );
}
