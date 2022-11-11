<template>
  <div class="login">
    <Toast />
    <Card style="width: 400px">
      <template #title><h1>Inicio de Sesion</h1></template>
      <template #content>
        <div class="p-fluid">
          <div class="field">
            <label for="username">Nombre de Usuario</label>
            <InputText id="username" v-model="user.username" type="text" />
          </div>
          <div class="field">
            <label for="password">Contraseña</label>
            <InputText id="password" v-model="user.password" type="password" />
          </div>
          <div class="field">
            <label for="company">Empresa</label>
            <Dropdown
              id="company"
              v-model="user.companies_id"
              :options="[]"
              optionLabel="descriptionName"
              optionValue="id"
            />
          </div>
          <div class="field">
            <Button label="Inicio de Sesion" @click="login(false)" />
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
import { useVuelidate } from "@vuelidate/core";
import { required } from "@vuelidate/validators";
import { useUserStore } from "~/store/user";
import Toast from "primevue/toast";
import InputText from "primevue/inputtext";
import Dropdown from "primevue/dropdown";
import Button from "primevue/button";
import Card from "primevue/card";
import Vue, { reactive, ref, computed } from "vue";
import {
  useRouter,
  useContext,
  defineComponent,
} from "@nuxtjs/composition-api";
export default Vue.extend({
  components: {
    InputText,
    Dropdown,
    Button,
    Toast,
    Card,
  },
  async setup() {
    const user = reactive({
      username: "",
      password: "",
      companies_id: null,
    });
    const rules = computed(() => ({
      username: { required },
      password: { required },
      companies_id: { required },
    }));

    const v$ = useVuelidate(rules, user);
    console.log(user);
    const { $axios } = useContext();

    const login = async (isFormValid: Boolean) => {
      v$.value.$touch();
      const userStore = useUserStore();
      if (isFormValid) {
        const response = await userStore.login(user);
        if (response.status) {
          useRouter().push("/");
        } else {
        }
      }
    };

    return {
      v$,
      login,
      user,
    };
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
