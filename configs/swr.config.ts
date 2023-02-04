import { SWRConfiguration } from "swr";
import axios from "axios";

export const SWR_CONFIG: SWRConfiguration = {
  fetcher: async function (url: string) {
    const response = await axios.get(url);

    return response.data;
  },
};
