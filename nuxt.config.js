export default {
  // Global page headers: https://go.nuxtjs.dev/config-head
  ssr: false,
  head: {
    title: "devts",
    htmlAttrs: {
      lang: "en",
    },
    meta: [
      { charset: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { hid: "description", name: "description", content: "" },
      { name: "format-detection", content: "telephone=no" },
    ],
    link: [{ rel: "icon", type: "image/x-icon", href: "/favicon.ico" }],
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [
    "primeflex/primeflex.css",
    "@/assets/css/index.scss",
    "@/assets/css/sakai-vue/layout.scss",
    "bootstrap-icons/font/bootstrap-icons.css"
  ],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
    "~/plugins/persist.ts",
    "~/plugins/axios.ts",
    "~/plugins/vuelidate.ts",
    "~/plugins/primevue.ts",
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    // https://go.nuxtjs.dev/typescript
    "@nuxt/typescript-build",
    "@nuxtjs/composition-api/module",
    "@pinia/nuxt",
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    // Doc: https://www.primefaces.org/primevue/showcase-v2/#/setup
    [
      "primevue/nuxt",
      {
        theme: "bootstrap4-light-blue",
        ripple: true,
        directives: ["Tooltip", "Badge"],
      },
    ],
    "@nuxtjs/axios",
    "@nuxtjs/moment"
  ],
  axios: {
    baseURL: "http://74.208.181.80:8444", // Used as fallback if no runtime config is provided
  },
  moment: {
    defaultTimezone: "America/Tegucigalpa",
    locales: ["es"],
  },
  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
    // https://github.com/primefaces/primevue/issues/844
    transpile: ["primevue"],
  },
};
