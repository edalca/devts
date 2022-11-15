import { useRouter, ref } from "@nuxtjs/composition-api";
import { es } from "~/content/languaje";
export function useES(url: String) {
  const routes = url.split("-");
  const esRoutes = [] as any;
  routes.forEach((route) => {
    var router = route;
    es.forEach((items) => {
      if (items.value == route) router = items.label;
    });
    esRoutes.push(router);
  });
  return esRoutes;
}
