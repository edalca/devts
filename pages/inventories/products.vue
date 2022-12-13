<template>
  <div>
    <table-render :form="data" />
  </div>
</template>
<script lang="ts">
import { required } from "vuelidate/lib/validators";
import { defineComponent, useRoute, onMounted } from "@nuxtjs/composition-api";
import { form } from "~/types/form";
import { useES } from "~/composables/es";
import { validationMessage } from "vuelidate-messages";
export default defineComponent({
  layout: "app",

  setup() {
    const data: form = {
      title: "Productos",
      fetch: {
        url: "inventories/products",
      },
      pageForm: false,
      breadcrumbs: useES(useRoute().value.name ?? ""),
      config: {
        titleNew: "Registro de Producto",
        titleEdit: "Editar Producto",
        editRegister: true,
        delRegister: true,
      },
      export: {
        pdf: true,
        xsl: true,
      },
      items: [
        {
          name: "code",
          type: "text",
          table: true,
          label: "Codigo",
          defaultValue: "",
          class: "field col-2",
          value: (props) => {
            return props.code;
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
          name: "name",
          type: "text",
          table: true,
          defaultValue: "",
          label: "Nombre del Producto",
          class: "field col-10",
          value: (props) => {
            return props.name;
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
          label: "Categoria",
          name: "categories",
          table: true,
          type: "select",
          defaultValue: null,
          class: "field col-6",
          value: (props) => {
            return props.categories.category;
          },
          options: {
            type: "remote",
            label: "category",
            url: "inventories/categories",
            params: {},
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
          label: "Unidad Medida",
          name: "units",
          table: true,
          type: "select",
          defaultValue: null,
          class: "field col-6",
          value: (props) => {
            return props.units.unit;
          },
          options: {
            type: "remote",
            label: "unit",
            url: "inventories/units",
            params: {},
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
          name: "amount",
          table: true,
          type: "number",
          defaultValue: 0,
          value: (props) => {
            return props.amount;
          },
          label: "Cantidad",
          class: "field col-4",
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
          name: "price",
          table: true,
          type: "number",
          defaultValue: 0,
          value: (props) => {
            return props.price;
          },
          label: "Precio",
          class: "field col-4",
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
          name: "cost",
          table: true,
          type: "number",
          defaultValue: 0,
          value: (props) => {
            return props.price;
          },
          label: "Costo",
          class: "field col-4",
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
          name: "accounts_inventory_id",
          label: "Cuenta Inventario",
          type: "select",
          defaultValue: null,
          class: "field col-6 ",
          table: true,
          value: (prop) => {
            return prop.account.accountNumber;
          },
          options: {
            type: "remote",
            label: "accountNumber",
            url: "accounting/accounts/filter",
            params: { code: "IVT" },
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
          name: "accounts_cost_id",
          label: "Cuenta Costo",
          type: "select",
          class: "field col-6",
          defaultValue: null,
          table: true,
          value: (prop) => {
            return prop.account.accountNumber;
          },
          bind: {
            optionLabel: "accountNumber",
            optionValue: "id",
            small: "accountName",
          },
          options: {
            type: "remote",
            label: "accountNumber",
            url: "accounting/accounts/filter",
            params: { code: "CDV,GDV" },
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
      ],
    };
    return {
      data,
    };
  },
});
</script>
