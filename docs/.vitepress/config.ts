import { defineConfig } from "vitepress";

export default defineConfig({
  title: "MatchPoint",
  description: "Offline table tennis scoreboard as a Progressive Web App",

  base: "/matchpoint/",

  themeConfig: {
    siteTitle: "MatchPoint 🏓",

    nav: [
      { text: "Guide", link: "/guide/development" },
      { text: "GitHub", link: "https://github.com/engel-b/matchpoint" },
      { text: "App", link: "https://matchpoint.familie-engel.info/" },
    ],

    sidebar: [
      {
        text: "Guide",
        items: [
          { text: "Development", link: "/guide/development" },
          { text: "Deployment", link: "/guide/deployment" },
          { text: "Bluetooth Buttons", link: "/guide/bluetooth" },
        ],
      },
    ],

    socialLinks: [
      {
        icon: "github",
        link: "https://github.com/engel-b/matchpoint",
      },
    ],
  },
});