import { defineConfig } from "vitepress";
import { withMermaid } from "vitepress-plugin-mermaid";

export default withMermaid(
  defineConfig({
    title: "MatchPoint",
    description: "Modernes Tischtennis-Scoreboard als PWA",
    base: "/matchpoint/",

    lastUpdated: true,

    locales: {
      root: {
        label: "Deutsch",
        lang: "de-DE",
        title: "MatchPoint",
        description: "Modernes Tischtennis-Scoreboard als PWA",

        themeConfig: {
          lastUpdated: {
            text: "Zuletzt aktualisiert",
            formatOptions: {
              dateStyle: "short",
              timeStyle: "short",
            },
          },

          nav: [
            { text: "Start", link: "/" },
            { text: "Erste Schritte", link: "/guide/" },
            { text: "Entwicklung", link: "/dev/" },
            { text: "App öffnen", link: "https://matchpoint.familie-engel.info/" },
          ],

          search: {
            provider: "local",
          },

          sidebar: [
            {
              text: "Erste Schritte",
              items: [
                { text: "Installation", link: "/guide/installation" },
                { text: "Spiel bedienen", link: "/guide/gameplay" },
                { text: "Eingabegeräte", link: "/guide/input-devices" },
                { text: "FAQ", link: "/guide/4-faq" },
              ],
            },
            {
              text: "Entwicklung",
              items: [
                { text: "Entwicklungsumgebung", link: "/dev/ide" },
                { text: "Architektur", link: "/dev/architecture" },
                { text: "Deployment", link: "/dev/deployment" },
                { text: "Releases", link: "/dev/releases" },
                { text: "Mitwirken", link: "/dev/contribution" },
              ],
            },
          ],

          docFooter: {
            prev: "Vorherige Seite",
            next: "Nächste Seite",
          },

          footer: {
            message:
              'Released under the <a href="https://github.com/engel-b/matchpoint/blob/main/LICENSE" target="_blank">MIT License</a>.',
            copyright:
              'Copyright © 2026 <a href="https://bjoern.familie-engel.info" target="_blank">Björn Engel</a> & <a href="https://github.com/engel-b/matchpoint" target="_blank">MatchPoint Contributors</a>',
          },
          outline: {
            level: [2, 3],
            label: "Auf dieser Seite",
          },
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
                { text: "Installation", link: "/en/guide/installation" },
                { text: "Gameplay", link: "/en/guide/gameplay" },
                { text: "Input Devices", link: "/en/guide/input-devices" },
                { text: "FAQ", link: "/en/guide/faq" },
              ],
            },
            {
              text: "Development",
              items: [
                { text: "Development Setup", link: "/en/dev/ide" },
                { text: "Architecture", link: "/en/dev/architecture" },
                { text: "Deployment", link: "/en/dev/deployment" },
                { text: "Releases", link: "/en/dev/releases" },
                { text: "Contributing", link: "/en/dev/contribution" },
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
