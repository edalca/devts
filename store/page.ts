import { defineStore } from "pinia";

export const usePageStore = defineStore("page", {
    state: () => ({
        data: {} as any,
        structure: {}
    }),
    actions: {
        page(data: any, structure: any) {
            this.data = data
            this.structure = structure
        }
    },
    persist: {
        enabled: true
    }
})