# Nuxt 3 Minimal Starter

Look at the [Nuxt 3 documentation](https://nuxt.com/docs/getting-started/introduction) to learn more.

## Setup

[Tutorial del curso que estamos levando :](https://www.youtube.com/watch?v=jaGxps_D1dw&list=PLxd1RHU8YgYmTKohDs2lTqGvy0eaZJFfK&index=7&ab_channel=PabloCodes)

 nuxt con Pinia :  https://pinia.vuejs.org/ssr/nuxt.html

## Development Server

https://vue3-toastify.js-bridge.com/get-started/installation.html
npm install --save vue3-toastify
Start the development server on `http://localhost:3000`:


### instalar NuxtUI
```bash
npx nuxi@latest module add ui
```
### crear archivo  tailwind.config.js
touch tailwind.config.js

```bash
# npm
 import type { Config } from "tailwindcss";
export default <Partial<Config>>{
content: ["docs/content/**/*.md"],
};
```
# crear un archivo en ./assets/tailwind.css

```bash
@tailwind base;
@tailwind components;
@tailwind utilities;
```
## Production

Build the application for production:
## API de cllientes  list users etc..
```bash
https://reqres.in/
```

```bash
# npm
npm run build

# pnpm
pnpm run build

# yarn
yarn build

# bun
bun run build
```

Locally preview production build:

```bash
# npm
npm run preview

# pnpm
pnpm run preview

# yarn
yarn preview

# bun
bun run preview
```

Check out the [deployment documentation](https://nuxt.com/docs/getting-started/deployment) for more information.
