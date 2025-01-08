export default defineNuxtConfig({
  devtools: { enabled: true },

  // Firebase genellikle istemci tarafında çalışır
  ssr: false,

  app: {
    head: {
      link: [
        {
          rel: "stylesheet",
          href: "https://fonts.googleapis.com/icon?family=Material+Icons",
        },
        {
          rel: "stylesheet",
          href: "https://fonts.googleapis.com/icon?family=Material+Symbols+Outlined",
        },
        {
          rel: "stylesheet",
          href: "https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.4/css/all.min.css",
        },
      ],
    },
  },

  css: ["bootstrap/dist/css/bootstrap.css"],
  plugins: ["~/plugins/firebase.js"],
  compatibilityDate: "2025-01-07",
  modules: ['@pinia/nuxt'],


  
});