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
      <form-render ref="form" :items="items" :data="data" />
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
import { VForm } from "~/types/render";
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
  data() {
    return {
      data: {},
      display: false,
      edit: false,
      editID: 0,
    };
  },
  computed: {
    form(): VForm {
      return this.$refs.form as VForm;
    },
  },
  methods: {
    showDialog(value: boolean) {
      if (!value) {
        this.editID = 0;
        this.edit = false;
        this.data = {};
      }
      this.display = value;
    },
    editForm(values: any) {
      this.data = values;
      this.showDialog(true);
      this.editID = values.id;
      this.edit = true;
    },
    save() {
      if (this.form.getValidation()) {
        console.log(this.form.getValues());
      }
    },
  },
});
</script>
