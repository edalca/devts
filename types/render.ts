export type VForm = Vue & {
    getValidation: () => boolean;
    getValues: () => Object;
    setValues: (values: any) => void
};