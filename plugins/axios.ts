import { defineNuxtPlugin } from "@nuxtjs/composition-api";
import { useUserStore } from "~/store/user";
export default defineNuxtPlugin((ctx) => {
  const { $axios } = ctx;
  $axios.onRequest((req) => {
    req.headers.common["Authorization"] = useUserStore().getToken;
  });
});
