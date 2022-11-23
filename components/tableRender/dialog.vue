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
import { conf, item, fetch } from "~/types/form";
import Button from "primevue/button";
import errorMessage from "~/mixins/errorMessages";
import { PropType, defineComponent, ref } from "@nuxtjs/composition-api";
export default defineComponent({
  mixins: [errorMessage],
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
    fetch: {
      type: Object as PropType<fetch>,
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
  methods: {
    showDialog(value: boolean) {
      const form = this.$refs.form as VForm;
      if (!value) {
        this.editID = 0;
        this.edit = false;
        this.data = {};
        form.resetValues();
      }
      this.display = value;
    },
    editForm(values: any) {
      this.data = values;
      this.showDialog(true);
      this.editID = values.id;
      this.edit = true;
    },

    async save() {
      const form = this.$refs.form as VForm;
      const data = await form.getValues();
      const valid = true;
      await form.getValidation();
      if (!valid) {
        if (!this.edit) {
          await this.$axios
            .post(this.fetch.url, form.getValues())
            .then((res) => {
              this.$toast.add({
                severity: res.data.status ? "success" : "error",
                summary: "Mensaje de Sistema",
                detail: res.data.message,
                life: 3000,
              });
            })
            .catch((err) => {
              this.errorMessages(err);
            });
        } else {
          await this.$axios
            .put(this.fetch.url + "/" + this.editID, form.getValues())
            .then((res) => {
              this.$toast.add({
                severity: res.data.status ? "success" : "error",
                summary: "Mensaje de Sistema",
                detail: res.data.message,
                life: 3000,
              });
            })
            .catch((err) => {
              this.errorMessages(err);
            });
        }
        this.$emit("show");
        this.showDialog(false);
      }
    },
  },
});
</script>
