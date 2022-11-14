import { defineNuxtMiddleware } from "@nuxtjs/composition-api";
import { useUserStore } from "~/store/user";
export default defineNuxtMiddleware(({ redirect }) => {
  if (useUserStore().isLoggin) {
    redirect("/");
  }
});
