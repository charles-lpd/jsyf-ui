export type ComponentSize = "sm" | "md" | "lg";

export type ComponentStatus = "default" | "success" | "warning" | "error";

export type Direction = "ltr" | "rtl";

export interface ComponentStateProps {
  disabled?: boolean;
  loading?: boolean;
}

export interface DesignSystemConfig {
  direction?: Direction;
  prefix?: string;
}
