<template>
  <div :class="containerClass" ref="layout" @click="onWrapperClick">
    <div ref="menuitems">
      <div class="layout-topbar">
        <div class="layout-topbar-logo">
          <span>Magnus System</span>
        </div>
        <button
          class="p-link layout-menu-button layout-topbar-button"
          @click="onMenuToggle"
        >
          <i class="pi pi-bars"></i>
        </button>
        <div class="layout-topbar-menu">
          <Button
            :label="username"
            icon="pi pi-user"
            @click="toggle"
            aria-haspopup="true"
            aria-controls="overlay_menu"
            class="p-button-text p-button-menu p-button-secondary"
          />
        </div>
      </div>
      <Menu id="overlay_menu" ref="menu" :model="userOptions" :popup="true" />
    </div>
    <div class="layout-sidebar" @click="onSidebarClick">
      <Menus :model="items" @menuitem-click="onMenuItemClick" />
    </div>
    <div class="layout-main-container">
      <div class="layout-main">
        <div class="content-layout">
          <nuxt />
        </div>
      </div>
    </div>
    <Toast />
  </div>
</template>
<script>
import { useUserStore } from "~~/store/user";
import modules from "../content/modules";
import Button from "primevue/button";
import Menu from "primevue/menu";
import Toast from "primevue/toast";
import { defineComponent, ref, computed } from "@nuxtjs/composition-api";
export default {
  components: {
    Button,
    Menu,
    Toast,
  },
  setup() {
    const username = useUserStore().getUsername;
    const menuClick = ref(false);
    const menu = ref();
    const items = ref(modules);
    const userOptions = [
      {
        label: "Cerrar Sesion",
        icon: "pi pi-sign-out",
        command: () => {
          logOff();
        },
      },
    ];
    const layoutMode = ref("static");
    const staticMenuInactive = ref(false);
    const overlayMenuActive = ref(false);
    const mobileMenuActive = ref(false);
    const containerClass = computed(() => {
      return [
        "layout-wrapper",
        {
          "layout-overlay": layoutMode.value === "overlay",
          "layout-static": layoutMode.value === "static",
          "layout-static-sidebar-inactive":
            staticMenuInactive.value && layoutMode.value === "static",
          "layout-overlay-sidebar-active":
            overlayMenuActive.value && layoutMode.value === "overlay",
          "layout-mobile-sidebar-active": mobileMenuActive.value,
        },
      ];
    });
    const onWrapperClick = () => {
      if (!menuClick.value) {
        overlayMenuActive.value = false;
        mobileMenuActive.value = false;
      }
      menuClick.value = false;
    };
    const toggle = (event) => {
      menu.value.toggle(event);
    };
    const onMenuItemClick = (event) => {
      if (event.item && !event.item.items) {
        overlayMenuActive.value = false;
        mobileMenuActive.value = false;
      }
    };
    const isDesktop = () => {
      return window.innerWidth >= 992;
    };
    const onMenuToggle = (event) => {
      menuClick.value = true;
      if (isDesktop()) {
        if (layoutMode.value === "overlay") {
          if (mobileMenuActive.value === true) {
            overlayMenuActive.value = true;
          }
          overlayMenuActive.value = !overlayMenuActive.value;
          mobileMenuActive.value = false;
        } else if (layoutMode.value === "static") {
          staticMenuInactive.value = !staticMenuInactive.value;
        }
      } else {
        mobileMenuActive.value = !mobileMenuActive.value;
      }
      event.preventDefault();
    };
    const onSidebarClick = () => {
      menuClick.value = true;
    };
    const logOff = () => {
      const userStore = useUserStore();
      userStore.logOff();
      useRouter().push("/login");
    };
    return {
      containerClass,
      onWrapperClick,
      toggle,
      onMenuItemClick,
      onMenuToggle,
      items,
      menu,
      onSidebarClick,
      userOptions,
      username,
    };
  },
};
</script>
