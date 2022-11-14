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
              v-model="v$.username.$model"
              type="text"
              :class="{
                'p-invalid': v$.username.$error,
              }"
            />
          </div>
          <div class="field">
            <label for="password">Contraseña</label>
            <InputText
              id="password"
              v-model="v$.password.$model"
              type="password"
              :class="{
                'p-invalid': v$.password.$error,
              }"
            />
          </div>
          <div class="field">
            <label for="company">Empresa</label>
            <Dropdown
              id="company"
              v-model="v$.companies_id.$model"
              :options="companies"
              optionLabel="descriptionName"
              optionValue="id"
              :class="{
                'p-invalid': v$.companies_id.$error,
              }"
            />
          </div>
          <div class="field">
            <Button label="Inicio de Sesion" @click="login(!v$.$invalid)" />
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
import Vue, { reactive, ref, computed, onMounted } from "vue";
import {
  useRouter,
  useContext,
  useAsync,
  defineComponent,
} from "@nuxtjs/composition-api";
export default defineComponent({
  middleware: "login",
  components: {
    InputText,
    Dropdown,
    Button,
    Toast,
    Card,
  },
  setup() {
    const router = useRouter();
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
    onMounted(() => {
      companyList();
    });
    const { $axios } = useContext();
    const companies = ref([]);
    const companyList = () =>
      useAsync(async () => {
        await $axios.get("/login/companies").then((resp) => {
          companies.value = resp.data;
        });
      });
    const login = async (isFormValid: Boolean) => {
      v$.value.$touch();
      const userStore = useUserStore();
      if (isFormValid) {
        const resp = await userStore.login(user, $axios);
        if (resp.value.status) {
          router.push("/");
        }
      }
    };
    return {
      v$,
      user,
      companies,
      login,
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
