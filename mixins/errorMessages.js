export default {
  methods: {
    errorMessages(err) {
      if (err.toJSON().message == "Network Error") {
        this.$toast.add({
          severity: "error",
          summary: "Error de conexion",
          detail: "No se ha podido conectar a la base de datos",
          life: 3000,
        });
        return true;
      } else {
        if (err.response.status == 403) {
          this.$confirm.require({
            message: err.response.data,
            header: "Autorizacion",
            icon: "pi pi-times",
            acceptClass: "p-button-danger",
            acceptLabel: "Aceptar",
            accept: () => {
              this.$store.dispatch("logout");
              this.$router.push("/login");
            },
          });
          return true;
        }
        if (err.response.status == 401) {
          this.$confirm.require({
            message: err.response.data,
            header: "Autorizacion",
            icon: "pi pi-exclamation-triangle",
            acceptClass: "p-button-danger",
            acceptLabel: "Aceptar",
            accept: () => {
              this.$store.dispatch("logout");
              this.$router.push("/login");
            },
          });
          return true;
        }
        if (err.response.status == 440) {
          this.$confirm.require({
            message: err.response.data,
            header: "Autorizacion",
            icon: "pi pi-clock",
            acceptClass: "p-button-warning",
            acceptLabel: "Aceptar",
            accept: () => {
              this.$store.dispatch("logout");
              this.$router.push("/login");
            },
          });
          return true;
        }
      }
    },
  },
};
