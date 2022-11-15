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
        :class="{
          'p-invalid': validate,
        }"
      />
      <form-render-error-message v-bind="{ item, v, validate }" />
    </template>
    <template v-else-if="item.type == 'textArea'">
      <form-render-label v-bind="{ item }" />
      <TextArea
        :id="item.name"
        v-model="values[item.name]"
        v-bind="item.bind"
        :tabindex="index.toString()"
        v-on="eventItem()"
        :class="{
          'p-invalid': validate,
        }"
      />
      <form-render-error-message v-bind="{ item, v, validate }" />
    </template>
    <template v-else-if="item.type == 'number'">
      <form-render-label v-bind="{ item }" />
      <InputNumber
        :id="item.name"
        v-model="values[item.name]"
        v-bind="item.bind"
        v-on="eventItem()"
        :tabindex="index.toString()"
        :class="{
          'p-invalid': validate,
        }"
      />
      <form-render-error-message v-bind="{ item, v, validate }" />
    </template>
    <template v-else-if="item.type == 'date'">
      <form-render-label v-bind="{ item }" />
      <Calendar
        :id="item.name"
        v-model="values[item.name]"
        v-bind="item.bind"
        v-on="eventItem()"
        :tabindex="index.toString()"
        dateFormat="dd/mm/yy"
        :showButtonBar="true"
        :class="{
          'p-invalid': validate,
        }"
      />
      <form-render-error-message v-bind="{ item, v, validate }" />
    </template>
    <template v-else-if="item.type == 'select'">
      <form-render-label v-bind="{ item }" />
      <Dropdown
        :id="item.name"
        v-model="values[item.name]"
        v-bind="item.bind"
        v-on="eventItem()"
        :tabindex="index.toString()"
        placeholder="Seleccione"
        :class="{
          'p-invalid': validate,
        }"
      >
        <template #value="props">
          <div v-if="props.value" style="font-size: 0.9em">
            <span v-if="item.small !== undefined">
              <b>{{ props.value[item.options.label] }}</b>
            </span>
            <small>{{ props.value[item.small ?? ""] }}</small>
          </div>
          <span v-else>{{ props.placeholder }}</span>
        </template>
        <template #option="props" v-if="item.small">
          <span>
            <b>{{ props.option[item.options.label] }}</b>
          </span>
          <small>{{ props.option[item.small ?? ""] }}</small>
        </template>
      </Dropdown>
      <form-render-error-message v-bind="{ item, v, validate }" />
    </template>
    <template v-else-if="item.type == 'cascade'">
      <form-render-label v-bind="{ item }" />
      <CascadeSelect
        :id="item.name"
        v-model="values[item.name]"
        v-bind="item.bind"
        v-on="eventItem()"
        :tabindex="index.toString()"
        placeholder="Seleccione"
        :class="{
          'p-invalid': validate,
        }"
        :optionGroupLabel="item.options.grouplabel"
        :optionGroupChildren="item.options.groupchildren"
      />
      <form-render-error-message v-bind="{ item, v, validate }" />
    </template>
    <template v-else-if="item.type == 'checkbox'">
      <template v-for="(subitem, subindex) in item.options">
        <Checkbox
          :inputId="item.name.toString() + subindex.toString()"
          v-model="values[item.name]"
          v-bind="item.bind"
          v-on="eventItem()"
          :tabindex="index.toString()"
          :value="subitem.value"
          :class="{
            'p-invalid': validate,
          }"
          :key="'chk-' + subindex.toString()"
        />
        <label
          :for="item.name.toString() + subindex.toString()"
          :key="'chk-' + subindex.toString()"
          >{{ subitem.value }}</label
        >
      </template>
      <form-render-error-message v-bind="{ item, v, validate }" />
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
import { Validation } from "@vuelidate/core";
import {
  defineComponent,
  computed,
  ref,
  onMounted,
} from "@nuxtjs/composition-api";
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
    v: {
      type: Object as PropType<Validation>,
      required: true,
    },
  },
  setup({ item, values, v }) {
    const hiddenItem = () => {
      if (
        item.type == "text" ||
        item.type == "number" ||
        item.type == "select" ||
        item.type == "date"
      ) {
        if (item?.hidden !== undefined) {
          return !item.hidden(values);
        }
      }
      return true;
    };
    const validate = computed((): boolean => {
      if (item.validate !== undefined) {
        return v.values[item.name].$error;
      }
      return false;
    });
    const eventItem = () => {
      if (item.type !== "datatable") {
        if (item.on !== undefined) {
          return item.on(values);
        }
      }
      return {};
    };

    return {
      hiddenItem,
      eventItem,
      validate,
      values,
      v,
    };
  },
});
</script>
