<template>
  <div>
    <table-render :form="data" />
  </div>
</template>
<script lang="ts">
import { form } from "~/types/form";
import { required, helpers } from "vuelidate/lib/validators";
import { defineComponent, useRoute, onMounted } from "@nuxtjs/composition-api";
import { useES } from "~/composables/es";
export default defineComponent({
  layout: "app",
  setup() {
    const data: form = {
      title: "Centro de Costos",
      fetch: {
        url: "accounting/costcenters",
        params: {},
      },
      pageForm: false,
      breadcrumbs: useES(useRoute().value.name ?? ""),
      config: {
        titleNew: "Registro de Centro de Costo",
        titleEdit: "Modificar Centro de Costo",
        editRegister: true,
        delRegister: true,
      },
      export: {
        pdf: false,
        xsl: false,
      },
      items: [
        {
          name: "code",
          type: "text",
          table: true,
          label: "Codigo",
          class: "field col-6",
          defaultValue: () => "",
          value: (values) => {
            return values.code;
          },
          validate: {
            required,
          },
        },
        {
          name: "costcenter",
          type: "text",
          table: true,
          label: "Centro de Costo",
          class: "field col-6",
          defaultValue: () => "",
          value: (values) => {
            return values.costcenter;
          },
          validate: {
            required,
          },
        },
        {
          name: "description",
          type: "textArea",
          table: true,
          label: "Descripcion",
          class: "field col-12",
          defaultValue: () => "",
          value: (values) => {
            return values.description;
          },
          validate: {
            required,
          },
        },
      ],
    };
    return {
      data,
    };
  },
});
</script>
