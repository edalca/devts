<template>
  <div>
    <p>{{ v$.username.$model }}</p>
  </div>
</template>

<script lang="ts">
import Vue, { reactive, computed } from "vue";
import { useVuelidate } from "@vuelidate/core";
import { required } from "@vuelidate/validators";
export default Vue.extend({
  name: "IndexPage",
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
    console.log(v$);
    return {
      user,
      v$,
    };
  },
});
</script>
