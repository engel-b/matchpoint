import fs from "node:fs/promises";
import path from "node:path";

import sharp from "sharp";

const root = process.cwd();

const logo = path.join(root, "assets", "logo.svg");
const publicDir = path.join(root, "public");

const ICONS = [
  {
    file: "icon-192.png",
    size: 192,
    padding: 0,
  },
  {
    file: "icon-512.png",
    size: 512,
    padding: 0,
  },
  {
    file: "maskable-icon-512.png",
    size: 512,
    padding: 0.18,
  },
  {
    file: "apple-touch-icon.png",
    size: 180,
    padding: 0,
  },
];

async function ensurePublicDirectory() {
  await fs.mkdir(publicDir, { recursive: true });
}

async function copyFavicon() {
  await fs.copyFile(logo, path.join(publicDir, "favicon.svg"));
  console.log("✓ favicon.svg");
}

async function renderIcon(outputFile: string, size: number, padding = 0) {
  const innerSize = Math.round(size * (1 - padding * 2));

  const renderedLogo = await sharp(logo)
    .resize(innerSize, innerSize, {
      fit: "contain",
    })
    .png()
    .toBuffer();

  await sharp({
    create: {
      width: size,
      height: size,
      channels: 4,
      background: { r: 0, g: 0, b: 0, alpha: 0 },
    },
  })
    .composite([
      {
        input: renderedLogo,
        gravity: "center",
      },
    ])
    .png()
    .toFile(path.join(publicDir, outputFile));

  console.log(`✓ ${outputFile}`);
}

async function main() {
  await ensurePublicDirectory();
  await copyFavicon();

  for (const icon of ICONS) {
    await renderIcon(icon.file, icon.size, icon.padding);
  }

  console.log("✔ Icons erstellt");
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
