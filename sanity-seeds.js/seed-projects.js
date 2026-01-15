// seed-projects.js
import fs from 'fs';
import path from 'path';
import { config } from 'dotenv';
import sanityClient from '@sanity/client';

config();

const client = sanityClient({
  projectId: process.env.SANITY_PROJECT_ID,
  dataset: process.env.SANITY_DATASET,
  apiVersion: '2025-09-01',
  useCdn: false,
  token: process.env.SANITY_TOKEN,
});

function loadJson(file) {
  const filePath = path.resolve(file);
  return JSON.parse(fs.readFileSync(filePath, 'utf8'));
}

const es = loadJson('./es.json');
const en = loadJson('./en.json');

// 1) Textos
const texts = {
  collabTitle: { es: es.PROJECTS.COLLAB,     en: en.PROJECTS.COLLAB },
  collabDesc:  { es: es.PROJECTS.COLLAB_DESC,en: en.PROJECTS.COLLAB_DESC },
  ownTitle:    { es: es.PROJECTS.OWN,        en: en.PROJECTS.OWN },
  ownDesc:     { es: es.PROJECTS.OWN_DESC,   en: en.PROJECTS.OWN_DESC },
};

// 2) Proyectos colaborativos (tu listado actual)
const collab = [
  { key: 'encode',   title: { es: 'Encode web', en: 'Encode web' }, url: 'https://www.encodesa.com.ar', order: 0, iframeAllowed: true },
  { key: 'tokelab',  title: { es: 'Tokelab',    en: 'Tokelab' },    url: 'https://tokelab.io',         order: 1, iframeAllowed: true },
  { key: 'propertize', title: { es: 'Propertize', en: 'Propertize' }, url: 'https://propertize.io',    order: 2, iframeAllowed: true },
  { key: 'clockit',  title: { es: 'ClockIt',    en: 'ClockIt' },    url: 'https://clockit.com.ar',     order: 3, iframeAllowed: true },
];

// 3) Proyectos personales (GitHub cards)
const personal = [
  {
    key: 'random-number-api-web',
    fullName: 'federicowoodward/random-number-api-web',
    description: {
      es: 'Generador de números aleatorios con Nest y Next.js.',
      en: 'Random number generator with Nest and Next.js.',
    },
    avatarUrl: 'https://avatars.githubusercontent.com/u/83924684?v=4&size=64',
    htmlUrl: 'https://github.com/federicowoodward/random-number-api-web',
    order: 0,
  },
  {
    key: 'angular-title-animation',
    fullName: 'federicowoodward/angular-title-animation',
    description: {
      es: 'Animación para títulos en Angular 19 utilizando GSAP.',
      en: 'Title animation in Angular 19 using GSAP.',
    },
    avatarUrl: 'https://avatars.githubusercontent.com/u/83924684?v=4&size=64',
    htmlUrl: 'https://github.com/federicowoodward/angular-title-animation',
    order: 1,
  },
  {
    key: 'prueba-tecnica-net',
    fullName: 'federicowoodward/prueba-tecnica-net',
    description: {
      es: 'Prueba técnica básica de .NET y Docker Compose (MySQL).',
      en: 'Basic .NET technical test with Docker Compose (MySQL).',
    },
    avatarUrl: 'https://avatars.githubusercontent.com/u/83924684?v=4&size=64',
    htmlUrl: 'https://github.com/federicowoodward/prueba-tecnica-net',
    order: 2,
  },
  {
    key: 'backend-1',
    fullName: 'federicowoodward/backend-1',
    description: {
      es: 'Repositorio para el curso de Backend en CoderHouse.',
      en: 'Repository for the Backend course at CoderHouse.',
    },
    avatarUrl: 'https://avatars.githubusercontent.com/u/83924684?v=4&size=64',
    htmlUrl: 'https://github.com/federicowoodward/backend-1',
    order: 3,
  },
  {
    key: 'portafolio',
    fullName: 'federicowoodward/portafolio',
    description: {
      es: 'Mi propio portafolio hecho en Angular 19.',
      en: 'My own portfolio built with Angular 19.',
    },
    avatarUrl: 'https://avatars.githubusercontent.com/u/83924684?v=4&size=64',
    htmlUrl: 'https://github.com/federicowoodward/portafolio',
    order: 4,
  },
];

async function seed() {
  const mutations = [
    // texts (un solo doc fijo)
    {
      createIfNotExists: {
        _id: 'projectsTexts-singleton',
        _type: 'projectsTexts',
        ...texts,
      },
    },
    // collab projects
    ...collab.map((p) => ({
      createIfNotExists: {
        _id: `collabProject-${p.key}`,
        _type: 'collabProject',
        ...p,
      },
    })),
    // personal projects
    ...personal.map((p) => ({
      createIfNotExists: {
        _id: `personalProject-${p.key}`,
        _type: 'personalProject',
        ...p,
      },
    })),
  ];

  const res = await client.mutate(mutations);
  console.log('Seed PROJECTS completado:', JSON.stringify(res, null, 2));
}

seed().catch((err) => { console.error(err); process.exit(1); });
