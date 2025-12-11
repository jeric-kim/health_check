import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  // GitHub Pages에서 정적 호스팅 시 자산 경로가 깨지지 않도록 상대 경로 사용
  base: "./",
});
