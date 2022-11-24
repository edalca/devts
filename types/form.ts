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
export interface fetch {
  url: string;
  params?: object;
}
interface breadcrumb {
  label: string;
  icon?: string;
}

interface exports {
  pdf: boolean;
  xsl: boolean;
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
  editRegister: boolean;
  delRegister: boolean;
}

interface inputText {
  name: string;
  type: "text" | "textArea" | "date";
  label: string;
  table: boolean;
  class: string;
  bind?: any;
  unique?: boolean,
  upperCase?: boolean,
  defaultValue: string;
  value: (values: any) => any;
  hidden?: (values: any) => boolean;
  on?: (values: any) => any;
  validate?: {
    validation: any,
    messages: any
  }
}

interface inputNumber {
  name: string;
  type: "number";
  label: string;
  table: boolean;
  class: string;
  bind?: any;
  unique?: boolean,
  defaultValue: number;
  value: (values: any) => any;
  hidden?: (values: any) => boolean;
  on?: (values: any) => any;
  validate?: {
    validation: any,
    messages: any
  }
}

interface none {
  name: string;
  type: "none";
  label: string;
  table: boolean;
  value: (values: any) => any;
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
    sublabel?: string;
    grouplabel?: string;
    groupchildren?: [];
    value?: any;
  }
  | {
    type: "static";
    values: any;
    label: string;
    sublabel?: string;
    value?: any;
    grouplabel?: string;
    groupchildren?: [];
  };
  bind?: any;
  small?: string;
  defaultValue: null | Array<Object | string> | string | number;
  value: (values: any) => any;
  hidden?: (values: any) => boolean;
  on?: (values: any) => any;
  validate?: {
    validation: any,
    messages: any
  }
}
interface check {
  name: string;
  label: string;
  type: "checkbox";
  table: boolean;
  class: string;
  bind?: any;
  on?: (values: any) => any;
  defaultValue: boolean;
  value: (values: any) => any;
  validate?: {
    validation: any,
    messages: any
  }
}

interface option {
  name: string;
  type: "radiobutton" | "multicheckbox";
  table: boolean;
  label: string;
  class: string;
  bind?: any;
  on?: (values: any) => any;
  defaultValue: string | number;
  value: (values: any) => any;
  options: Array<{
    value: string;
    hidden?: (values: any) => boolean;
  }>;
  validate?: {
    validation: any,
    messages: any
  }
}
interface datatable {
  name: string;
  type: "datatable";
  label: string;
  table: boolean;
  class: string;
  value: (values: any) => any;
  options: Array<{
    value: string;
    hidden?: (values: any) => boolean;
  }>;
  validate?: {
    validation: any,
    messages: any
  }
}
interface divide {
  type: "divide";
}

export type item = inputText | inputNumber | select | option | check | datatable | divide | none;
export type items = inputText | inputNumber | select | option | check | datatable;
