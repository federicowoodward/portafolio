import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'projectsTexts',
  title: 'Projects Texts',
  type: 'document',
  fields: [
    defineField({ name: 'collabTitle', title: 'Collab Title', type: 'localizedString', validation: r => r.required() }),
    defineField({ name: 'collabDesc',  title: 'Collab Desc',  type: 'localizedString', validation: r => r.required() }),
    defineField({ name: 'ownTitle',    title: 'Own Title',    type: 'localizedString', validation: r => r.required() }),
    defineField({ name: 'ownDesc',     title: 'Own Desc',     type: 'localizedString', validation: r => r.required() }),
  ],
  preview: { prepare: () => ({ title: 'Projects Texts' }) }
})
