<template>
  <div>
    <page-render
      :items="items"
      :conf="config"
      :fetch="fetch"
      :values="values"
    />
  </div>
</template>
<script lang="ts">
import { defineComponent } from "@nuxtjs/composition-api";
import { usePageStore } from "~/store/page";
import { form } from "~/types/form";
export default defineComponent({
  layout: "app",
  setup() {
    const pageStore = usePageStore();
    const { items, config, fetch } = pageStore.structure as form;
    const values = pageStore.data;
    return {
      items,
      config,
      fetch,
      values,
    };
  },
});
</script>
