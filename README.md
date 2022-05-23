# adorable-css-to-unocss

Make it easy to use some rules of [adorable-css](https://github.com/developer-1px/adorable-css) on [unocss](https://github.com/unocss/unocss).

## how to use

```ts
import { defineConfig } from "vite";
import unocss from "unocss/vite";
import { adorable2uno } from "adorable-css-to-unocss";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    unocss({
      rules: [...adorable2uno],
    }),
  ],
});
```
