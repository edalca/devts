<template>
  <div>
    <div style="margin: 1em 2.5em 0 2.5em">
      <div class="page-head p-d-flex p-jc-between">
        <div class="p-d-flex">
          <h3 style="font-weight: bold">
            {{ edit ? conf.titleEdit : conf.titleNew }}
          </h3>
        </div>
        <div>
          <Button
            class="p-button-sm p-button-raised p-button-success"
            label="Guardar"
            @click="save()"
          />

          <Button
            class="p-button-danger p-button-sm p-button-raised"
            label="Cancelar"
            @click="cancelForm"
          />
        </div>
      </div>
    </div>
    <Card style="margin: 1em 2em 0 2em">
      <template #title> </template>
      <template #content>
        <form-render
          :items="items"
          :data="data"
          :edit="edit"
          :values="values"
          ref="form"
        />
      </template>
    </Card>

    <ConfirmDialog />
  </div>
</template>

<script lang="ts">
import { usePageStore } from "~/store/page";
import * as _ from "lodash";
import { item, conf, fetch } from "~/types/form";
import errorMessage from "~/mixins/errorMessages";
import { PropType, defineComponent, ref } from "@nuxtjs/composition-api";
import Button from "primevue/button";
import Card from "primevue/card";
import ConfirmDialog from "primevue/confirmdialog";
export default defineComponent({
  mixins: [errorMessage],
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
    values: {
      type: Array,
      required: true,
    },
  },
  components: {
    Button,
    Card,
    ConfirmDialog,
  },
  data() {
    return {
      data: {},
      filters: {},
      display: false,
      edit: false,
      editID: 0,
    };
  },
  methods: {
    editForm() {
      const pageStore = usePageStore();
      this.data = _.cloneDeep(pageStore.data);
      this.editID = pageStore.data?.id ?? 0;
      this.edit = true;
      this.$refs.form.setValues(this.data);
    },
    async save() {
      const data = await this.$refs.form.getValues();
      const valid = await this.$refs.form.getValidation();
      var validSave = true;
      if (!valid) {
        if (!this.edit) {
          await this.$axios
            .post(this.url, data)
            .then((res) => {
              validSave = res.data.status;
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
            .put(this.url + "/" + this.editID, data)
            .then((res) => {
              validSave = res.data.status;
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
        if (validSave) {
          this.$emit("show");
          const pageStore = usePageStore();
          pageStore.page({}, {});
          this.$router.go(-1);
        }
      } else {
        console.log("Invalido");
      }
    },

    cancelForm() {
      const pageStore = usePageStore();
      pageStore.page({}, {});
      this.$router.go(-1);
    },
  },
});
</script>
