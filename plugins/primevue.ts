import Vue from "vue";
import ToastService from "primevue/toastservice";
import ConfirmationService from "primevue/confirmationservice";
import Tooltip from "primevue/tooltip";

Vue.directive("tooltip", Tooltip);
Vue.use(ToastService);
Vue.use(ConfirmationService);
