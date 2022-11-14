<template>
  <div>
    <p>{{ "HOLA" }}</p>
  </div>
</template>

<script lang="ts">
import Vue, { reactive, computed } from "vue";
import { useVuelidate } from "@vuelidate/core";
import { required } from "@vuelidate/validators";
export default Vue.extend({
  layout: "app",
  setup() {
    const user = reactive({
      username: "antarhn",
      password: "",
      companies_id: null,
    });
    const rules = computed(() => ({
      username: { required },
      password: { required },
      companies_id: { required },
    }));

    const v$ = useVuelidate(rules, user);
    return {
      user,
      v$,
    };
  },
});
</script>
