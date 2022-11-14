<template>
  <div>
    <Dialog
      :closable="false"
      :visible="display"
      :style="{
        width: '50vw',
      }"
      :modal="true"
    >
      <template #header>
        <h2>{{ edit ? conf.titleEdit : conf.titleNew }}</h2>
      </template>
      <form-render ref="form" :items="items" />
      <template #footer>
        <Button
          label="Guardar"
          @click="save()"
          icon="pi pi-save"
          class="p-button-success p-button-sm p-button-raised"
        />
        <Button
          label="Cancelar"
          icon="pi pi-times"
          @click="showDialog(false)"
          class="p-button-danger p-button-sm p-button-raised"
        />
      </template>
    </Dialog>
  </div>
</template>
<script lang="ts">
import Dialog from "primevue/dialog";
import { conf, item } from "~/types/form";
import Button from "primevue/button";
import { PropType, defineComponent, ref } from "@nuxtjs/composition-api";
export default defineComponent({
  components: {
    Dialog,
    Button,
  },
  props: {
    items: {
      type: Array as PropType<item[]>,
      required: true,
    },
    conf: {
      type: Object as PropType<conf>,
      required: true,
    },
  },
  setup() {
    const display = ref(false);
    const edit = ref(false);
    const editID = ref(0);
    const data = ref([]);
    const form = ref();

    const showDialog = (value: boolean) => {
      if (!value) {
        editID.value = 0;
        edit.value = false;
        data.value = [];
      }
      display.value = value;
    };
    const editForm = (values: any) => {
      data.value = values;
      showDialog(true);
      editID.value = values.id;
      edit.value = true;
    };
    const save = () => {
      form.value.getValidation();
    };
    return {
      display,
      showDialog,
      editForm,
      edit,
      data,
      save,
      form,
    };
  },
});
</script>
