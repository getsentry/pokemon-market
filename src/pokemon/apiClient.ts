import { MainClient } from "pokenode-ts";

let api: MainClient | null = null;

export default function mainClient() {
  if (!api) {
    api = new MainClient({cacheOptions: {methods: []}});
  }
  return api;
}
