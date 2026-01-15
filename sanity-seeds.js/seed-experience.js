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

const itemsEs = es.EXPERIENCE.ITEMS;
const itemsEn = en.EXPERIENCE.ITEMS;

async function seed() {
  const mutations = Object.keys(itemsEs).map((key, index) => {
    const esItem = itemsEs[key];
    const enItem = itemsEn[key];

    return {
      createIfNotExists: {
        _id: `experienceItem-${key}`,
        _type: "experienceItem",
        key,
        order: index,
        name: { es: esItem.NAME, en: enItem.NAME },
        role: { es: esItem.ROLE, en: enItem.ROLE },
        dates: { es: esItem.DATES, en: enItem.DATES },
        paragraphs: (esItem.PARAGRAPHS || []).map((p, i) => ({
          es: p,
          en: enItem.PARAGRAPHS?.[i] || "",
        })),
        icons: esItem.ICONS || [],
      },
    };
  });

  const res = await client.mutate(mutations);
  console.log("Seed completado:", JSON.stringify(res, null, 2));
}

seed().catch((err) => {
  console.error(err);
  process.exit(1);
});
