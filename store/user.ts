import { defineStore } from "pinia";
import { useContext } from "@nuxtjs/composition-api"
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
      companies_id: 0
    },
    token: "",
  }),
  actions: {
    async login(user: any) {
      const { $axios } = useContext()
      const { data } = await $axios.post<Response>("/login", user)
      if (data.status) {
        this.users = data.user;
        this.token = data.token;
      }
      return data;
    },
    logOff() {
      this.users = {
        username: "",
        companies_id: 0
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
  }
});
