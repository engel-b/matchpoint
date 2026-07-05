import { defineConfig } from "vitepress";
import { withMermaid } from "vitepress-plugin-mermaid";

export default withMermaid(
  defineConfig({
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
            { text: "Erste Schritte", link: "/guide/" },
            { text: "Entwicklung", link: "/dev/" },
            { text: "App öffnen", link: "https://matchpoint.familie-engel.info/" },
          ],

          sidebar: [
            {
              text: "Erste Schritte",
              items: [
                { text: "Installation", link: "/guide/1-installation" },
                { text: "Spiel bedienen", link: "/guide/2-gameplay" },
                { text: "Eingabegeräte", link: "/guide/3-input-devices" },
                { text: "FAQ", link: "/guide/4-faq" },
              ],
            },
            {
              text: "Entwicklung",
              items: [
                { text: "Entwicklungsumgebung", link: "/dev/1-ide" },
                { text: "Architektur", link: "/dev/2-architecture" },
                { text: "Deployment", link: "/dev/3-deployment" },
                { text: "Releases", link: "/dev/4-releases" },
                { text: "Mitwirken", link: "/dev/5-contribution" },
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
            { text: "Getting started", link: "/en/guide/" },
            { text: "Development", link: "/en/dev/" },
            { text: "Open App", link: "https://matchpoint.familie-engel.info/" },
          ],

          sidebar: [
            {
              text: "Getting started",
              items: [
                { text: "Installation", link: "/en/guide/1-installation" },
                { text: "Spiel bedienen", link: "/en/guide/2-gameplay" },
                { text: "Eingabegeräte", link: "/en/guide/3-input-devices" },
                { text: "FAQ", link: "/en/guide/4-faq" },
              ],
            },
            {
              text: "Development",
              items: [
                { text: "Entwicklungsumgebung", link: "/en/dev/1-ide" },
                { text: "Architektur", link: "/en/dev/2-architecture" },
                { text: "Deployment", link: "/en/dev/3-deployment" },
                { text: "Releases", link: "/en/dev/4-releases" },
                { text: "Mitwirken", link: "/en/dev/5-contribution" },
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
  })
);
