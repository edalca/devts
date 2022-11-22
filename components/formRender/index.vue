<template>
  <div class="p-fluid grid">
    <template v-for="(item, index) in items">
      <template v-if="item.type == 'divide'">
        <div class="col-12" :key="index"></div>
      </template>
      <template v-else>
        <form-render-item
          v-bind="{ item, values, index, v: $v }"
          v-if="item.type !== 'none'"
          :key="index"
        />
      </template>
    </template>
  </div>
</template>
<script lang="ts">
import { item } from "~/types/form";

import { defineComponent, PropType } from "@nuxtjs/composition-api";
export default defineComponent({
  props: {
    items: {
      type: Array as PropType<item[]>,
      required: true,
    },
    data: {
      type: Object,
      required: true,
    },
    structure: {
      type: Object,
      required: true,
    },
  },
  mounted() {
    this.setValues(this.data);
  },
  data() {
    return {
      values: this.structure,
      valuesReset: this.structure,
      edit: false,
    };
  },
  computed: {
    validate() {
      var rule = {} as any;
      this.items.forEach((item) => {
        if (item.type !== "none") {
          if (item.type !== "divide") {
            if (item.validate != undefined) {
              if (this.edit == true) {
                if (item.validate["isUnique"] !== undefined) {
                  delete item.validate["isUnique"];
                }
              }
              rule[item.name] = item.validate;
            }
          }
        }
      });
      return rule;
    },
  },
  validations() {
    return {
      values: this.validate,
    };
  },
  methods: {
    async getValidation() {
      this.$v.$touch();
      return this.$v.$invalid;
    },
    getValues() {
      return this.values;
    },
    setValues(value: any) {
      this.items.forEach((item) => {
        if (item.type !== "divide") {
          if (item.type !== "none") this.values[item.name] = value[item.name];
        }
      });
      this.edit = true;
    },
    resetValues() {
      this.$v.$reset();
      this.values = this.valuesReset;
    },
  },
});
</script>
