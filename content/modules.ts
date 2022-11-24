export default [
  {
    label: "Inicio",
    items: [
      {
        label: "Dashboard",
        icon: "pi pi-fw pi-home",
        to: "/",
      },
    ],
  },
  {
    label: "Contabilidad",
    items: [
      {
        label: "Plan de Cuentas",
        to: "/accounting/accounts",
        icon: "bi bi-journal-text",
      },
      {
        label: "Centros de Costos",
        to: "/accounting/costcenters",
        icon: "bi bi-journal-bookmark",
      },
      {
        label: "Libros Contables",
        to: "/accounting/accountbooks",
      },
    ],
  },
];
