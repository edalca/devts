<template>
  <div class="p-fluid grid">
    <template v-for="(item, index) in items">
      <template v-if="item.type == 'divide'">
        <div class="col-12" :key="index"></div>
      </template>
      <template v-else>
        <form-render-item
          v-bind="{ item, values, index, v: v$ }"
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
import { useVuelidate } from "@vuelidate/core";
import {
  defineComponent,
  PropType,
  ref,
  onMounted,
  reactive,
  computed,
} from "@nuxtjs/composition-api";
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
  mounted() {
    this.setValues(this.data);
  },
  setup() {
    return { v$: useVuelidate() };
  },
  data() {
    return {
      values: this.structure(),
      valuesReset: this.structure(),
      edit: false,
    };
  },
  validations() {
    return {
      values: this.validate,
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
  methods: {
    structure() {
      const values = {} as any;
      this.items.forEach((item) => {
        if (item.type == "text") values[item.name] = item.defaultValue ?? "";
        if (item.type == "textArea")
          values[item.name] = item.defaultValue ?? "";
        if (item.type == "number") values[item.name] = item.defaultValue ?? 0;
        if (item.type == "select")
          values[item.name] = item.defaultValue ?? null;
        if (item.type == "date") values[item.name] = item.defaultValue ?? null;
        if (item.type == "checkbox") {
          if (item.bind.binary == true) {
            values[item.name] = item.defaultValue ?? false;
          } else {
            values[item.name] = item.defaultValue ?? "";
          }
        }
        if (item.type == "radiobutton")
          values[item.name] = item.defaultValue ?? "";
        if (item.type == "datatable") values[item.name] = [];
      });
      values["companies_id"] = useUserStore().getCompany;
      return values;
    },
    async getValidation() {
      await this.v$.$touch();
      return this.v$.$invalid;
    },
    getValues() {
      return this.values;
    },
    setValues(value: any) {
      console.log(this.values);
      this.items.forEach((item) => {
        if (item.type !== "divide") {
          if (item.type !== "none") this.values[item.name] = value[item.name];
        }
      });
      console.log(this.values);
      this.edit = true;
    },
    resetValues() {
      this.$v.$reset();
      this.values = this.valuesReset;
    },
  },
});
</script>
