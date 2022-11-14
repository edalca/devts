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
import { defineComponent, PropType, ref } from "@nuxtjs/composition-api";
export default defineComponent({
  props: {
    items: {
      type: Array as PropType<item[]>,
      required: true,
    },
  },
  setup({ items }) {
    const edit = ref(false);
    const rules = () => {
      const rule = ref();
      items.forEach((item) => {
        if (item.type !== "none") {
          if (item.type !== "divide") {
            if (item.validate != undefined) {
              if (edit.value == true) {
                if (item.validate["isUnique"] !== undefined) {
                  delete item.validate["isUnique"];
                }
              }
              rule.value[item.name] = item.validate;
            }
          }
        }
      });
      return rule;
    };
    const structure = () => {
      const values = ref();
      items.forEach((item) => {
        if (item.type == "text")
          values.value[item.name] = item.defaultValue ?? "";
        if (item.type == "number")
          values.value[item.name] = item.defaultValue ?? 0;
        if (item.type == "select")
          values.value[item.name] = item.defaultValue ?? null;
        if (item.type == "date")
          values.value[item.name] = item.defaultValue ?? null;
        if (item.type == "checkbox") {
          if (item.bind.binary == true) {
            values.value[item.name] = item.defaultValue ?? false;
          } else {
            values.value[item.name] = item.defaultValue ?? "";
          }
        }
        if (item.type == "radiobutton")
          values.value[item.name] = item.defaultValue ?? "";
        if (item.type == "datatable") values.value[item.name] = [];
      });
      values.value["companies_id"] = useUserStore().getCompany;
      return values;
    };
    const values = ref(structure());
    const v$ = useVuelidate(rules(), values);
    const resetValues = () => {
      values.value = ref(structure);
    };
    const setValues = (value: any) => {
      items.forEach((item) => {
        if (item.type !== "divide") {
          if (item.type !== "none") values.value[item.name] = value[item.name];
        }
      });
      edit.value = true;
    };
    const getValidation = async () => {
      await v$.value.$touch();
      return v$.value.$invalid;
    };
    const getValues = () => {
      return values;
    };
    return {
      getValues,
      values,
      getValidation,
      setValues,
      v$,
    };
  },
});
</script>
