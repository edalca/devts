<template>
  <div class="login">
    <Toast />
    <Card style="width: 400px">
      <template #title>Inicio de Sesion</template>
      <template #content>
        <div class="p-fluid">
          <div class="field">
            <label for="username">Nombre de Usuario</label>
            <InputText
              id="username"
              v-model="$v.username.$model"
              type="text"
              :class="{
                'p-invalid': $v.username.$error,
              }"
            />
          </div>
          <div class="field">
            <label for="password">Contraseña</label>
            <InputText
              id="password"
              v-model="$v.password.$model"
              type="password"
              :class="{
                'p-invalid': $v.password.$error,
              }"
            />
          </div>
          <div class="field">
            <label for="company">Empresa</label>
            <Dropdown
              id="company"
              v-model="$v.companies_id.$model"
              :options="companies"
              optionLabel="descriptionName"
              optionValue="id"
              :class="{
                'p-invalid': $v.companies_id.$error,
              }"
            />
          </div>
          <div class="field">
            <Button label="Inicio de Sesion" @click="login(!$v.$invalid)" />
          </div>
          <div class="field">
            <Button label="Registrar Empresa" class="p-button-secondary" />
          </div>
        </div>
      </template>
    </Card>
  </div>
</template>

<script lang="ts">
import { useUserStore } from "~/store/user";
import Toast from "primevue/toast";
import InputText from "primevue/inputtext";
import Dropdown from "primevue/dropdown";
import Button from "primevue/button";
import Card from "primevue/card";
import { required } from "vuelidate/lib/validators";
import { defineComponent } from "@nuxtjs/composition-api";
export default defineComponent({
  middleware: "login",
  components: {
    InputText,
    Dropdown,
    Button,
    Toast,
    Card,
  },
  mounted() {
    this.companyList();
  },
  data() {
    return {
      username: "",
      password: "",
      companies_id: null,
      companies: [],
    };
  },
  validations: {
    username: {
      required,
    },
    password: {
      required,
    },
    companies_id: {
      required,
    },
  },
  methods: {
    async login(isFormValid: Boolean) {
      this.$v.$touch();
      const userStore = useUserStore();
      if (isFormValid) {
        const resp = await userStore.login(
          {
            username: this.username,
            password: this.password,
            companies_id: this.companies_id,
          },
          this.$axios
        );
        if (resp.value.status) {
          this.$router.push("/");
        }
      }
    },
    async companyList() {
      await this.$axios.get("/login/companies").then((resp) => {
        this.companies = resp.data;
      });
    },
  },
});
</script>

<style scoped>
.login {
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: top;
  padding-top: 15vh;
}
</style>
