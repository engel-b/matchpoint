import fs from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";

const root = process.cwd();

const logo = path.join(root, "assets", "logo.svg");
const publicDir = path.join(root, "public");

async function ensurePublicDirectory() {
  await fs.mkdir(publicDir, { recursive: true });
}

async function renderIcon(
  outputFile: string,
  size: number,
  padding = 0
) {
  let input: Buffer;

  if (padding === 0) {
    input = await fs.readFile(logo);
  } else {
    const svg = await fs.readFile(logo, "utf8");

    const scale = 1 - padding * 2;

    input = Buffer.from(`
<svg xmlns="http://www.w3.org/2000/svg"
     viewBox="0 0 512 512">

  <g transform="
      translate(${padding * 512} ${padding * 512})
      scale(${scale})">

${svg
  .replace(/<\?xml.*?\?>/g, "")
  .replace(/<svg[^>]*>/, "")
  .replace("</svg>", "")}

  </g>

</svg>
`);
  }

  await sharp(input)
    .resize(size, size)
    .png()
    .toFile(path.join(publicDir, outputFile));

  console.log(`✓ ${outputFile}`);
}

const ICONS = [
  {
    file: "favicon.svg",
    size: 32,
  },
  {
    file: "icon-192.png",
    size: 192,
  },
  {
    file: "icon-512.png",
    size: 512,
  },
  {
    file: "maskable-icon-512.png",
    size: 512,
    padding: 0.15,
  },
  {
    file: "apple-touch-icon.png",
    size: 180,
  },
];

async function main() {
  await ensurePublicDirectory();

  for (const icon of ICONS) {
    await renderIcon(
      icon.file,
      icon.size,
      icon.padding ?? 0
    );
  }

  console.log("✔ Icons erstellt");
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});