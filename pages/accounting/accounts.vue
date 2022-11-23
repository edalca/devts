<template>
  <div>
    <table-render :form="data" />
  </div>
</template>
<script lang="ts">
import { required, helpers, requiredIf } from "vuelidate/lib/validators";
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
        editRegister: true,
        delRegister: true,
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
          class: "field col-4",
          defaultValue: "",
          value: (values) => {
            return values.accountNumber;
          },
          validate: {
            required,
          },
        },
        {
          name: "accountName",
          type: "text",
          table: true,
          label: "Nombre Cuenta",
          class: "field col-6",
          defaultValue: "",
          value: (values) => {
            return values.accountName;
          },
          validate: {
            required,
          },
        },
        {
          name: "isgroup",
          type: "checkbox",
          label: "Es Grupo",
          table: true,
          class: "field-checkbox col-2",
          defaultValue: false,
          value: (values) => {
            return values.isgroup ? "Grupo" : "Detalle";
          },
        },
        {
          name: "type",
          type: "select",
          table: true,
          label: "Tipo de Cuenta",
          class: "field col-6",
          defaultValue: null,
          value: (values: any) => {
            return options.find((item) => item.value == values.type)?.name;
          },
          options: {
            type: "static",
            label: "name",
            value: "value",
            values: options,
          },
          validate: {
            required,
          },
        },
        {
          name: "accounttypes",
          type: "select",
          label: "Clasificiacion Cuenta",
          table: true,
          class: "field col-6",
          defaultValue: null,
          value: (values: any) => {
            return values.accounttypes?.accounttype ?? "";
          },
          options: {
            type: "remote",
            label: "accounttype",
            url: "accounting/accounttypes",
            params: {},
          },
          hidden: (values) => {
            return values.isgroup;
          },
          validate: {
            required: requiredIf((value) => {
              return true;
            }),
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
