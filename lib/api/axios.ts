import axios from "axios";

const API_URL =
  process.env.NEXT_PUBLIC_API_URL || "https://notehub-public.goit.study/api";
const TOKEN = process.env.NEXT_PUBLIC_NOTEHUB_TOKEN;

export const api = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
    ...(TOKEN ? { Authorization: `Bearer ${TOKEN}` } : {}),
  },
});
