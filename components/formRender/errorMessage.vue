<template>
  <span v-if="validate" style="color: #f05e5c">
    <small>{{ v.values[item.name].$errors[0].$message }}</small>
  </span>
</template>
<script lang="ts">
import { Validation } from "@vuelidate/core";
import { items } from "~/types/form";
import { defineComponent, PropType } from "@nuxtjs/composition-api";
export default defineComponent({
  props: {
    item: {
      type: Object as PropType<items>,
      required: true,
    },
    v: {
      type: Object as PropType<Validation>,
      required: true,
    },
    validate: {
      type: Boolean,
      required: true,
    },
  },
});
</script>
