<template>
  <div>
    <table-render :form="data" />
  </div>
</template>
<script lang="ts">
import { required } from "vuelidate/lib/validators";
import { form } from "~/types/form";
import extravalidation from "~/mixins/extravalidation";
import { defineComponent, useRoute, useContext } from "@nuxtjs/composition-api";
import { useES } from "~/composables/es";
import { validationMessage } from "vuelidate-messages";
export default defineComponent({
  layout: "app",
  mixins: [extravalidation],
  setup() {
    const { $axios } = useContext();
    const data: form = {
      title: "Libros Contables",
      fetch: {
        url: "accounting/accountbooks",
      },
      pageForm: false,
      breadcrumbs: useES(useRoute().value.name ?? ""),
      config: {
        titleNew: "Nuevo Libro Contable",
        titleEdit: "Editar Libro Contable",
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
          label: "Codigo",
          table: true,
          defaultValue: "",
          class: "field col-6",
          unique: true,
          value: (values) => {
            return values.code;
          },
          upperCase: true,
          validate: {
            validation: {
              required,
            },
            messages: validationMessage(
              {
                required: () => "El dato es requerido",
                unique: () => "El codigo ingresado ya existe",
              },
              {}
            ),
          },
        },
        {
          name: "accountbook",
          type: "text",
          table: true,
          label: "Libro Contable",
          class: "field col-6",
          defaultValue: "",
          value: (values) => {
            return values.accountbook;
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
