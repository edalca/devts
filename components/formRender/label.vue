<template>
  <label :for="item.name"
    >{{ item.label }}
    <span v-if="item.validate != undefined" style="color: red">*</span></label
  >
</template>
<script lang="ts">
import { items } from "~/types/form";
import { defineComponent, PropType } from "@nuxtjs/composition-api";
export default defineComponent({
  props: {
    item: {
      type: Object as PropType<items>,
      required: true,
    },
  },
  setup({ item }) {
    return {
      item,
    };
  },
});
</script>
