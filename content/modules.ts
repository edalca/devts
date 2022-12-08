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
        icon: "pi pi-circle",
      },
      {
        label: "Centros de Costos",
        to: "/accounting/costcenters",
        icon: "pi pi-circle",
      },
      {
        label: "Libros Contables",
        to: "/accounting/accountbooks",
        icon: "pi pi-circle"
      },
    ],
  },
  {
    label: "Inventario",
    items: [{
      label: "Productos",
      icon: "pi pi-circle",
      to: "/inventories/products",
    }]

  }
];
