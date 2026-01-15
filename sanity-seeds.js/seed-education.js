import fs from "fs";
import path from "path";
import { config } from "dotenv";
import sanityClient from "@sanity/client";

config();

const client = sanityClient({
  projectId: process.env.SANITY_PROJECT_ID,
  dataset: process.env.SANITY_DATASET,
  apiVersion: "2025-09-01",
  useCdn: false,
  token: process.env.SANITY_TOKEN,
});

function loadJson(file) {
  const filePath = path.resolve(file);
  return JSON.parse(fs.readFileSync(filePath, "utf8"));
}

const es = loadJson("./es.json");
const en = loadJson("./en.json");

const itemsEs = es.EDUCATION.ITEMS;
const itemsEn = en.EDUCATION.ITEMS;

function toBool(x) {
  if (typeof x === "boolean") return x;
  if (typeof x === "string") return x.toLowerCase() === "true";
  return false;
}

async function seed() {
  const keys = Object.keys(itemsEs);
  const mutations = keys.map((key, index) => {
    const esItem = itemsEs[key] || {};
    const enItem = itemsEn[key] || {};

    return {
      createIfNotExists: {
        _id: `educationItem-${key}`,
        _type: "educationItem",
        key,
        order: index,
        name: { es: esItem.NAME, en: enItem.NAME },
        role: { es: esItem.ROLE, en: enItem.ROLE },
        dates: { es: esItem.DATES, en: enItem.DATES },
        icons: Array.isArray(esItem.ICONS) ? esItem.ICONS : [],
        hasCertificate: toBool(
          esItem.HAS_CERTIFICATE ?? enItem.HAS_CERTIFICATE
        ),
        // certificate se puede subir luego manualmente desde el Studio
      },
    };
  });

  const res = await client.mutate(mutations);
  console.log("Seed EDUCATION completado:", JSON.stringify(res, null, 2));
}

seed().catch((err) => {
  console.error(err);
  process.exit(1);
});
