<template>
  <div>
    <div style="margin: 2em 2.5em 0 2.5em" ref="titleRef">
      <div class="flex flex-column">
        <div class="flex justify-content-between">
          <div>
            <h1>{{ form.title }}</h1>
          </div>
          <div>
            <Button
              label="Nuevo"
              icon="pi pi-plus"
              @click="newRegister"
              class="p-button-raised p-button p-button-sm ml-1"
            />
            <Button
              icon="pi pi-refresh"
              v-tooltip.top="'Actualizar'"
              class="p-button-raised p-button-text p-button-secondary p-button-sm ml-1"
              @click="show()"
            />

            <Button
              icon="pi pi-download"
              class="p-button-secondary p-button-raised p-button-text p-button-sm ml-1"
              aria-haspopup="true"
              aria-controls="overlay_menu"
              v-tooltip.top="'Exportar'"
              v-if="form.export.pdf == true || form.export.xsl == true"
            />
            <Button
              icon="pi pi-cloud-upload"
              v-tooltip.top="'Importar'"
              class="p-button-raised p-button-text p-button-secondary p-button-sm ml-1"
            />
          </div>
        </div>
      </div>
    </div>
    <div
      class="p-card"
      style="margin: 1em 2.5em 0 2.5em; padding: 0.2rem"
      :style="{ height: tableHeight + 30 + 'px' }"
    >
      <DataTable
        :value="values"
        scrollHeight="flex"
        :scrollable="true"
        class="p-datatable-custom"
        :loading="loading"
      >
        <template #header>
          <div class="flex justify-content-end align-items-center" tabindex="0">
            <span class="p-input-icon-left">
              <i class="pi pi-search" />
              <InputText placeholder="Buscar" />
            </span>
          </div>
        </template>
        <template #empty>
          <span style="text-align: center">
            <i class="pi pi-inbox" style="font-size: 2.5rem"> </i>
            <p>No hay registros</p>
          </span>
        </template>
        <template v-for="(item, index) in items">
          <Column
            :header="item.label"
            v-if="item.type !== 'divide'"
            :key="index"
          >
            <template #body="{ data }">
              {{ item.value(data) }}
            </template>
          </Column>
        </template>
        <Column header="Optiones" :styles="{ 'max-width': '150px' }">
          <template #body="slot">
            <Button
              v-if="config.editRegister"
              icon="pi pi-pencil"
              @click="edit(slot.data)"
              class="p-button-rounded p-button-text p-button-warning p-button-sm"
            />
            <Button
              v-if="config.delRegister"
              icon="pi pi-trash"
              @click="del(slot)"
              class="p-button-rounded p-button-text p-button-danger p-button-sm"
            />
          </template>
        </Column>
      </DataTable>
    </div>
    <table-render-dialog
      ref="dialogRender"
      :items="items"
      :conf="config"
      :fetch="fetch"
    />
    <ConfirmDialog />
  </div>
</template>
<script lang="ts">
import { PropType } from "vue";
import { form } from "~/types/form";
import DataTable from "primevue/datatable";
import Column from "primevue/column";
import InputText from "primevue/inputtext";
import Button from "primevue/button";
import ConfirmDialog from "primevue/confirmdialog";

import {
  onMounted,
  ref,
  defineComponent,
  useContext,
} from "@nuxtjs/composition-api";

export default defineComponent({
  props: {
    form: {
      type: Object as PropType<form>,
      required: true,
    },
  },
  components: {
    Column,
    DataTable,
    InputText,
    Button,
    ConfirmDialog,
  },
  data() {
    return {};
  },
  methods: {
    async del(value: any) {
      this.$confirm.require({
        message: "¿Desea Eliminar este registro?",
        header: "Eliminar Registro",
        icon: "pi pi-info-circle",
        acceptClass: "p-button-danger",
        acceptLabel: "Eliminar",
        rejectLabel: "Cancelar",
        accept: async () => {
          await this.$axios
            .delete(this.form.fetch.url + "/" + value.data.id)
            .then((res) => {
              this.$toast.add({
                severity: res.data.status ? "success" : "error",
                summary: "Mensaje Sistema",
                detail: res.data.message,
                life: 3000,
              });
              this.show();
            });
        },
      });
    },
  },
  setup({ form }) {
    const { $axios, $moment } = useContext();

    onMounted(() => {
      innerHeight.value = window.innerHeight;
      tableHeight.value = innerHeight.value * 0.8;
      show();
    });
    const loading = ref(true);
    const dialogRender = ref();
    const { fetch, config } = form;
    const items = form.items.filter(
      (item) => item.type !== "divide" && item.table == true
    );

    const searchs = ref({});
    const innerHeight = ref(0);
    const tableHeight = ref(0);
    const values = ref([]);
    const show = async () => {
      loading.value = true;
      await $axios
        .get<[]>(fetch.url, {
          params: fetch.params,
        })
        .then((res) => {
          values.value = res.data;
        });
      loading.value = false;
    };
    const newRegister = () => {
      dialogRender.value.showDialog(true);
    };
    const edit = async (values: any) => {
      dialogRender.value.editForm(values);
    };

    return {
      items,
      config,
      values,
      edit,
      searchs,
      tableHeight,
      dialogRender,
      newRegister,
      show,
      loading,
      fetch,
    };
  },
});
</script>
<style lang="scss">
.p-datatable-custom .p-datatable-thead {
  background-color: white !important;

  tr > th {
    border-bottom: none;
    background-color: white !important;
  }
}
.p-datatable-custom .p-datatable-header {
  background-color: white !important;
  border-top: none;
}
</style>
