"use client";

import axios from "axios";
import { Constants } from "./Contants";

const api = axios.create({
  baseURL: Constants.SERVER_URL,
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
    Authorization: `Bearer ${localStorage.getItem("token") ?? ""}`,
  },
});

export default api;
