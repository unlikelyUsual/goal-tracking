import axios from "axios";
import { Constants } from "./Contants";

const api = axios.create({
  baseURL: Constants.SERVER_URL,
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});

// const requestInterceptor = (config: any) => {
//   const apiHeader = config.headers;
//   const nextHeaders = headers()

//   for (const [key, value] of nextHeaders.values) {
//     apiHeader[key] = value;
//   }

//   return config;
// };

// axios.interceptors.request.use(requestInterceptor);

export default api;
