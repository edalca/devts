<template>
  <div class="p-fluid grid">
    <template v-for="(item, index) in items">
      <template v-if="item.type == 'divide'">
        <div :class="item.class" :key="index"></div>
      </template>
      <template v-else>
        <form-render-item
          :index="index"
          :values="value"
          :item="item"
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
import { isUnique } from "~/composables/extravalidations";
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
    edit: {
      type: Boolean,
      required: true,
      defaultValue: false,
    },
    values: {
      type: Array as any,
      required: true,
    },
  },
  async mounted() {
    this.value = await this.structure();
    if (this.edit) {
      this.setValues(this.data);
    }
  },
  data() {
    return {
      value: {} as any,
    };
  },
  computed: {
    validate(): any {
      var rule = {} as any;
      this.items.forEach((item) => {
        if (item.type !== "none") {
          if (item.type !== "divide") {
            if (item.validate != undefined) {
              if (this.edit != true) {
                if (item?.unique == true) {
                  item.validate.validation.unique = isUnique(
                    this.values,
                    item.name
                  );
                }
              }
              rule[item.name] = item.validate.validation;
            }
          }
        }
      });
      return rule;
    },
  },
  validations() {
    return {
      value: this.validate,
    };
  },
  methods: {
    async structure() {
      const values = {} as any;
      this.items.forEach((item) => {
        if (
          item.type !== "none" &&
          item.type !== "divide" &&
          item.type !== "datatable"
        )
          values[item.name] = item.defaultValue;
        else if (item.type == "datatable") values[item.name] = [];
      });
      values["companies_id"] = useUserStore().getCompany;
      return values;
    },
    async getValidation() {
      await this.$v.$touch();
      return this.$v.$invalid;
    },
    getValues() {
      return this.value;
    },
    setValues(value: any) {
      this.items.forEach((item) => {
        if (item.type !== "divide" && item.type !== "none") {
          this.value[item.name] = value[item.name];
        }
      });
    },
  },
});
</script>
