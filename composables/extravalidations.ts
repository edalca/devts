import { NuxtAxiosInstance } from "@nuxtjs/axios";
export const isUnique =
  (element: any, axios: NuxtAxiosInstance, url: string, params: any) =>
  async (value: any) => {
    const data = await axios
      .get(url, {
        params: params,
      })
      .then((res) => {
        return res.data.find((items: any) => items[element] == value);
      })
      .catch((err) => {
        return [];
      });
    if (data == undefined || data == null) return true;
    if (Object.keys(data).length > 0) return false;
  };

export const isUniqueSelect =
  (
    element: any,
    axios: NuxtAxiosInstance,
    url: string,
    params: any,
    elvalue: any
  ) =>
  async (value: any) => {
    const data = await axios
      .get(url, {
        params: params,
      })
      .then((res) => {
        return res.data.find((items: any) => items[element] == value[elvalue]);
      })
      .catch((err) => {
        return [];
      });
    if (data == undefined || data == null) return true;
    if (Object.keys(data).length > 0) return false;
  };
