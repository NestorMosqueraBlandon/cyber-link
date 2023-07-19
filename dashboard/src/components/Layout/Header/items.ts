import { PrivateRoutes } from "@/constant-definitions";

export default [
  {
    name: "Clientes",
    path: PrivateRoutes.CLIENTS,
  },
  {
    name: "Categorias",
    path: PrivateRoutes.CATEGORIES,
  },
  {
    name: "Ventas",
    path: PrivateRoutes.ORDERS,
  },
  {
    name: "Inventario",
    path: PrivateRoutes.PRODUCTS,
    subPaths: [
      {
        name: "Productos",
        path: PrivateRoutes.PRODUCTS,
      },
    ],
  },

];
