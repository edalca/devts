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
import { validationMessage } from "vuelidate-messages";
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
      pageForm: true,
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
          unique: true,
          class: "field col-4",
          defaultValue: "",
          value: (values) => {
            return values.accountNumber;
          },
          validate: {
            validation: {
              required,
            },
            messages: validationMessage(
              {
                required: () => "El dato es requerido",
                unique: () => "El numero de cuenta ya existe",
              },
              {}
            ),
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
            validation: {
              required,
            },
            messages: validationMessage(
              {
                required: () => "El dato es requerido",
              },
              {}
            ),
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
          defaultValue: "A",
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
            validation: {
              required,
            },
            messages: validationMessage(
              {
                required: () => "El dato es requerido",
              },
              {}
            ),
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
            validation: {
              required: requiredIf((values) => {
                if (values.isgroup == false) return true;
                else return false;
              }),
            },
            messages: validationMessage(
              {
                required: () => "El dato es requerido",
              },
              {}
            ),
          },
        },
        {
          name: "balance",
          label: "Balance",
          table: true,
          type: "none",
          value: (values) => {
            return values.balance;
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
