<template>
  <span v-if="validate" style="color: #f05e5c">
    <small>{{ messages }}</small>
  </span>
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
    validate: {
      type: Boolean,
      required: true,
    },
  },
  computed: {
    messages() {},
  },
});
</script>
