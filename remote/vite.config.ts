import { federation } from "@module-federation/vite";
import { vitePlugin as remix } from "@remix-run/dev";
import { defineConfig } from "vite";
import tsconfigPaths from "vite-tsconfig-paths";
import commonjs from "vite-plugin-commonjs";

export default defineConfig({
  server: {
    port: 4174
  },
  base: '.',
  plugins: [
    remix({
      future: {
        v3_fetcherPersist: true,
        v3_relativeSplatPath: true,
        v3_throwAbortReason: true,
      },
    }),
    tsconfigPaths(),
    federation({
      filename: 'remoteEntry.js',
      name: 'remote',
      exposes: {
        './remote-app': './app/routes/components/Counter.tsx',
      },
      remotes: {},
    }),
  ],
  build: {
    target: 'chrome89',
    sourcemap: false,
  },
});
