import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";

// You can get the 'mode' from NODE_ENV or another environment variable.
const mode = process.env.NODE_ENV || 'development';
const env = loadEnv(mode, process.cwd(), 'REACT_APP_');

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  define: {
    "process.env.REACT_APP_ORDER_URL": JSON.stringify(env.REACT_APP_ORDER_URL),
    "process.env.REACT_APP_LISTS_BANK_URL": JSON.stringify(env.REACT_APP_LISTS_BANK_URL),
    "process.env.REACT_APP_PAYOS_SCRIPT": JSON.stringify(env.REACT_APP_PAYOS_SCRIPT),
    global: "window",
  },
  optimizeDeps: {
    include: ["@mui/material/Box"],
  },
});
