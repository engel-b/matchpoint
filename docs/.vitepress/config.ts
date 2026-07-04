import { defineConfig } from "vitepress";

export default defineConfig({
  title: "MatchPoint",
  description: "Modernes Tischtennis-Scoreboard als PWA",
  base: "/matchpoint/",

  locales: {
    root: {
      label: "Deutsch",
      lang: "de-DE",
      title: "MatchPoint",
      description: "Modernes Tischtennis-Scoreboard als PWA",

      themeConfig: {
        nav: [
          { text: "Start", link: "/" },
          { text: "Anleitung", link: "/guide/development" },
          { text: "App öffnen", link: "https://matchpoint.familie-engel.info/" },
        ],

        sidebar: [
          {
            text: "Anleitung",
            items: [
              { text: "Entwicklung", link: "/guide/development" },
              { text: "Deployment", link: "/guide/deployment" },
              { text: "Bluetooth-Tasten", link: "/guide/bluetooth" },
            ],
          },
        ],
      },
    },

    en: {
      label: "English",
      lang: "en-US",
      title: "MatchPoint",
      description: "Modern table tennis scoreboard as a PWA",

      themeConfig: {
        nav: [
          { text: "Home", link: "/en/" },
          { text: "Guide", link: "/en/guide/development" },
          { text: "Open App", link: "https://matchpoint.familie-engel.info/" },
        ],

        sidebar: [
          {
            text: "Guide",
            items: [
              { text: "Development", link: "/en/guide/development" },
              { text: "Deployment", link: "/en/guide/deployment" },
              { text: "Bluetooth Buttons", link: "/en/guide/bluetooth" },
            ],
          },
        ],
      },
    },
  },

  themeConfig: {
    siteTitle: "MatchPoint 🏓",

    socialLinks: [
      {
        icon: "github",
        link: "https://github.com/engel-b/matchpoint",
      },
    ],
  },
});
