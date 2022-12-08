<template>
  <div :class="item.class" v-if="hiddenItem()">
    <template v-if="item.type == 'text'">
      <form-render-label v-bind="{ item }" />
      <InputText
        :id="item.name"
        v-model="values[item.name]"
        v-bind="item.bind"
        :tabindex="index.toString()"
        v-on="eventItem()"
        v-tooltip="{ value: tooltip, disabled: !validate }"
        @input="upperCase"
        :class="{
          'p-invalid': validate,
        }"
      />
    </template>
    <template v-else-if="item.type == 'textArea'">
      <form-render-label v-bind="{ item }" />
      <TextArea
        :id="item.name"
        v-model="values[item.name]"
        v-bind="item.bind"
        :tabindex="index.toString()"
        v-on="eventItem()"
        @input="upperCase"
        v-tooltip="{ value: tooltip, disabled: !validate }"
        :class="{
          'p-invalid': validate,
        }"
      />
    </template>
    <template v-else-if="item.type == 'number'">
      <form-render-label v-bind="{ item }" />
      <InputNumber
        :id="item.name"
        v-model="values[item.name]"
        v-bind="item.bind"
        v-on="eventItem()"
        v-tooltip="{ value: tooltip, disabled: !validate }"
        :tabindex="index.toString()"
        :class="{
          'p-invalid': validate,
        }"
      />
    </template>
    <template v-else-if="item.type == 'date'">
      <form-render-label v-bind="{ item }" />
      <Calendar
        :id="item.name"
        v-model="values[item.name]"
        v-bind="item.bind"
        v-on="eventItem()"
        v-tooltip="{ value: tooltip, disabled: !validate }"
        :tabindex="index.toString()"
        dateFormat="dd/mm/yy"
        :showButtonBar="true"
        :class="{
          'p-invalid': validate,
        }"
      />
    </template>
    <template v-else-if="item.type == 'select'">
      <form-render-label v-bind="{ item }" />
      <Dropdown
        :id="item.name"
        v-model="values[item.name]"
        v-on="eventItem()"
        v-tooltip="{ value: tooltip, disabled: !validate }"
        :tabindex="index.toString()"
        placeholder="Seleccione"
        :optionLabel="item.options.label"
        :optionValue="item.options.value ?? null"
        :class="{
          'p-invalid': validate,
        }"
        :options="options"
      >
      </Dropdown>
    </template>
    <template v-else-if="item.type == 'cascade'">
      <form-render-label v-bind="{ item }" />
      <CascadeSelect
        :id="item.name"
        v-model="values[item.name]"
        v-bind="item.bind"
        v-on="eventItem()"
        v-tooltip="{ value: tooltip, disabled: !validate }"
        :tabindex="index.toString()"
        placeholder="Seleccione"
        :class="{
          'p-invalid': validate,
        }"
        :options="options"
        :optionGroupLabel="item.options.grouplabel"
        :optionGroupChildren="item.options.groupchildren"
      />
    </template>
    <template v-else-if="item.type == 'checkbox'">
      <Checkbox
        :inputId="item.name.toString() + index.toString()"
        v-model="values[item.name]"
        v-on="eventItem()"
        v-tooltip="{ value: tooltip, disabled: !validate }"
        :binary="true"
        :tabindex="index.toString()"
        :class="{
          'p-invalid': validate,
        }"
        :key="'chk-' + index.toString()"
      />
      <form-render-label v-bind="{ item }" />
    </template>
  </div>
</template>
<script lang="ts">
import { PropType } from "vue";
import { items } from "~/types/form";
import InputText from "primevue/inputtext";
import TextArea from "primevue/textarea";
import InputNumber from "primevue/inputnumber";
import Calendar from "primevue/calendar";
import Dropdown from "primevue/dropdown";
import CascadeSelect from "primevue/cascadeselect";
import Checkbox from "primevue/checkbox";
import { defineComponent } from "@nuxtjs/composition-api";
export default defineComponent({
  components: {
    InputText,
    TextArea,
    InputNumber,
    Calendar,
    Dropdown,
    CascadeSelect,
    Checkbox,
  },
  mounted() {
    this.getOptions();
  },
  props: {
    item: {
      type: Object as PropType<items>,
      required: true,
    },
    values: {
      type: Object,
      required: true,
    },
    index: {
      type: Number,
      required: true,
    },
  },
  data() {
    return {
      options: [],
    };
  },
  computed: {
    validate(): boolean {
      if (this.item.validate !== undefined) {
        return this.$parent?.$v.value[this.item.name]?.$error ?? false;
      }
      return false;
    },
    tooltip(): string {
      if (this.item.validate?.messages != undefined) {
        return this.item.validate?.messages(
          this.$parent?.$v.value[this.item.name]
        );
      } else {
        return "";
      }
    },
  },
  methods: {
    hiddenItem() {
      if (
        this.item.type == "text" ||
        this.item.type == "number" ||
        this.item.type == "select" ||
        this.item.type == "date"
      ) {
        if (this.item?.hidden !== undefined) {
          const hidden = !this.item.hidden(this.values);
          return hidden;
        }
      }
      return true;
    },
    async getOptions() {
      if (this.item.type == "select" || this.item.type == "cascade") {
        if (this.item.options.type == "static") {
          this.options = this.item.options.values;
        }
        if (this.item.options.type == "remote") {
          await this.$axios
            .get(this.item.options.url, {
              params: this.item.options?.params ?? {},
            })
            .then((resp) => {
              this.options = resp.data;
            });
        }
      }
    },

    eventItem() {
      if (this.item.type !== "datatable") {
        if (this.item.on !== undefined) {
          return this.item.on(this.values);
        }
      }
      return {};
    },
    upperCase(value: string) {
      if (this.item.type == "text" || this.item.type == "textArea") {
        if (this.item?.upperCase == true) {
          this.values[this.item.name] = value.toUpperCase();
        }
      }
    },
  },
});
</script>
