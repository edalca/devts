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
import { useUserStore } from "~/store/user";
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
  },
  async mounted() {
    this.valuesReset = await this.structure();
    this.values = await this.structure();
  },
  data() {
    return {
      values: {},
      valuesReset: {},
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
    async structure() {
      const values = {} as any;
      this.items.forEach((item) => {
        if (item.type == "text") values[item.name] = item.defaultValue;
        else if (item.type == "textArea") values[item.name] = item.defaultValue;
        else if (item.type == "number") values[item.name] = item.defaultValue;
        else if (item.type == "select") values[item.name] = item.defaultValue;
        else if (item.type == "date") values[item.name] = item.defaultValue;
        else if (item.type == "checkbox") values[item.name] = item.defaultValue;
        else if (item.type == "radiobutton")
          values[item.name] = item.defaultValue;
        else if (item.type == "datatable") values[item.name] = [];
      });
      values["companies_id"] = useUserStore().getCompany;
      console.log(values);
      return values;
    },
    async getValidation() {
      this.$v.$touch();
      return this.$v.$invalid;
    },
    getValues() {
      console.log(this.values);
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
