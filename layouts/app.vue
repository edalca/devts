<template>
  <div>
    <h2>{{ message }}</h2>
    <nuxt />
  </div>
</template>
<script lang="ts">
import { ref } from "vue";

export default {
  setup() {
    const message = ref("Hola");
    return {
      message,
    };
  },
};
</script>
