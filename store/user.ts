import { defineStore } from "pinia";
import { NuxtAxiosInstance } from "@nuxtjs/axios";
import { ref } from "vue";
interface Response {
  message: String;
  user?: any;
  token?: any;
  status: Boolean;
}

export const useUserStore = defineStore("user", {
  state: () => ({
    users: {
      username: "",
      companies_id: 0,
    },
    token: "",
  }),
  actions: {
    async login(user: any, $axios: NuxtAxiosInstance) {
      const response = ref();
      await $axios.$post<Response>("/login", user).then((resp) => {
        if (resp.status) {
          this.users = resp.user;
          this.token = resp.token;
        }
        response.value = resp;
      });
      return response;
    },
    logOff() {
      this.users = {
        username: "",
        companies_id: 0,
      };
      this.token = "";
    },
  },
  getters: {
    getUsername(): string {
      return this.users.username;
    },
    isLoggin(): Boolean {
      return this.token.length > 0 ? true : false;
    },
    getToken(): string {
      return this.token;
    },
    getCompany(): Number {
      return this.users?.companies_id;
    },
  },
  persist: {
    enabled: true,
  },
});
