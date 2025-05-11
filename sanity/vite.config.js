import { defineConfig } from "vite";
import path from "path";
import { fileURLToPath } from "url";

// ✅ Definir __dirname manualmente
const __dirname = path.dirname(fileURLToPath(import.meta.url));

export default defineConfig({
  resolve: {
    alias: {
      "@": path.resolve(__dirname), // alias @ apunta a /sanity
    },
  },
});
