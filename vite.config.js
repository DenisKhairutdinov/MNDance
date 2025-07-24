export default {
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `@use '/src/mixins.scss' as *;
                         @use '/src/vars.scss' as *;`,
      },
    },
  },
};
