<template>
  <div>
    <table-render :form="data" />
  </div>
</template>
<script lang="ts">
import { required, helpers } from "@vuelidate/validators";
import { form } from "~/types/form";
import { defineComponent, useRoute, onMounted } from "@nuxtjs/composition-api";
import { useES } from "~/composables/es";
const options = [
  {
    name: "Activos",
    value: "A",
  },
  {
    name: "Pasivos",
    value: "P",
  },
  {
    name: "Capital",
    value: "C",
  },
  {
    name: "Ingresos",
    value: "I",
  },
  {
    name: "Costos",
    value: "S",
  },
  {
    name: "Gastos",
    value: "G",
  },
];

export default defineComponent({
  layout: "app",
  setup() {
    const data: form = {
      title: "Cuentas Contables",
      fetch: {
        url: "/accounting/accounts",
      },
      pageForm: false,
      breadcrumbs: useES(useRoute().value.name ?? ""),
      config: {
        titleNew: "Registro de Cuenta",
        titleEdit: "Editar Cuenta",
      },
      export: {
        pdf: true,
        xsl: true,
      },
      items: [
        {
          name: "accountNumber",
          type: "text",
          table: true,
          label: "No. Cuenta",
          class: "field col-6",
          value: (values) => {
            return values.accountNumber;
          },
          validate: {
            required: helpers.withMessage(
              "El numero de cuenta es requerido",
              required
            ),
          },
        },
        {
          name: "accountName",
          type: "text",
          table: true,
          label: "Nombre Cuenta",
          class: "field col-6",
          value: (values) => {
            return values.accountName;
          },
        },
        {
          name: "type",
          type: "select",
          table: true,
          label: "Tipo de Cuenta",
          class: "field col-4",
          value: (values) => {
            return values.type;
          },
          options: {
            type: "static",
            label: "name",
            value: "value",
            values: options,
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
