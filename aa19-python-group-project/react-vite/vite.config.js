import { defineConfig } from "vite";
import eslintPlugin from "vite-plugin-eslint";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig((mode) => ({
  plugins: [
    react(),
    eslintPlugin({
      lintOnStart: true,
      failOnError: mode === "production",
    }),
  ],
  server: {
    open: true,
    proxy: {
      "/api": {
        target: "http://127.0.0.1:8000",
        changeOrigin: true,
        secure: false,
      },
      "/socket.io/": {
        target: "http://127.0.0.1:8000",
        changeOrigin: true,
        secure: false,
        ws: true,
      }
    }
  },
  build: {
    chunkSizeWarningLimit: 1000,
  }
}));




// import { defineConfig } from 'vite';
// import dotenv from 'dotenv';
// import react from '@vitejs/plugin-react';
// import eslint from 'vite-plugin-eslint';


// dotenv.config();
// // https://vitejs.dev/config/
// export default defineConfig(({ mode }) => ({
//   plugins: [
//     react(),
//     eslint({
//       lintOnStart: true,
//       failOnError: mode === "production"
//     })
    
//   ],
//   define: {
//     'process.env': process.env
//   },
//   // To automatically open the app in the browser whenever the server starts,
//   // uncomment the following lines:
//   server: {
//     open: true,
//     proxy: {
//       '/api': 'http://localhost:8000'
//     },
//   }
// }));
