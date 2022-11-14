export interface form {
  title: String;
  fetch: fetch;
  pageForm: Boolean;
  breadcrumbs: breadcrumb[];
  config: conf;
  export: exports;
  import?: imports;
  items: item[];
}
interface fetch {
  url: string;
  params?: object;
}
interface breadcrumb {
  label: string;
  icon?: string;
}

interface exports {
  pdf?: boolean;
  xsl?: boolean;
}
interface imports {
  url: string;
  name: string;
  template: string;
  schema: any;
}

export interface conf {
  titleNew: string;
  titleEdit: string;
}

interface input {
  name: string;
  type: "text" | "textArea" | "number" | "date" | "none";
  label: string;
  table: boolean;
  class: string;
  bind?: any;
  defaultValue?: () => any;
  value: (values: any) => any;
  hidden?: (values: any) => boolean;
  on?: (values: any) => any;
  validate?: any;
}
interface select {
  name: string;
  type: "select" | "cascade";
  label: string;
  table: boolean;
  class: string;
  options:
    | {
        type: "remote";
        url: string;
        params: object;
        label: string;
        grouplabel?: string;
        groupchildren?: [];
        value?: any;
      }
    | {
        type: "static";
        values: any;
        label: string;
        value?: any;
        grouplabel?: string;
        groupchildren?: [];
      };
  bind?: any;
  small?: string;
  defaultValue?: () => any;
  value: (values: any) => any;
  hidden?: (values: any) => boolean;
  on?: (values: any) => any;
  validate?: any;
}
interface option {
  name: string;
  type: "radiobutton" | "checkbox";
  label: string;
  table: boolean;
  class: string;
  bind?: any;
  on?: (values: any) => any;
  defaultValue?: () => any;
  value: (values: any) => any;
  options: Array<{
    value: string;
    hidden?: (values: any) => boolean;
  }>;
  validate?: any;
}
interface datatable {
  name: string;
  type: "datatable";
  label: string;
  table: boolean;
  class: string;
  defaultValue?: () => any;
  value: (values: any) => any;
  options: Array<{
    value: string;
    hidden?: (values: any) => boolean;
  }>;
  validate?: any;
}
interface divide {
  type: "divide";
}

export type item = input | select | option | datatable | divide;
export type items = input | select | option | datatable;
