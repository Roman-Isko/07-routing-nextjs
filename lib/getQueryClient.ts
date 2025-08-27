import { QueryClient } from "@tanstack/react-query";

let client: QueryClient | null = null;

export default function getQueryClient() {
  // створюємо новий QueryClient тільки якщо ще не існує
  if (!client) {
    client = new QueryClient();
  }
  return client;
}
