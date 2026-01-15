import { defineType } from 'sanity'

export default defineType({
  name: 'localizedString',
  title: 'Localized String',
  type: 'object',
  fields: [
    { name: 'es', title: 'Español', type: 'string' },
    { name: 'en', title: 'English', type: 'string' },
  ],
  preview: {
    select: { es: 'es', en: 'en' },
    prepare: ({ es, en }) => ({ title: es || en || '(sin contenido)' }),
  },
})
