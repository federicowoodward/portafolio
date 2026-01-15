// /schemas/documents/experienceItem.ts
import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'experienceItem',
  title: 'Experience Item',
  type: 'document',
  fields: [
    defineField({ name: 'key', title: 'Key', type: 'string', validation: r => r.required() }), // ej: ENCODE/KUNAN/FREELANCE
    defineField({ name: 'name', title: 'Company / Name', type: 'localizedString', validation: r => r.required() }),
    defineField({ name: 'role', title: 'Role', type: 'localizedString', validation: r => r.required() }),
    defineField({ name: 'dates', title: 'Dates', type: 'localizedString', validation: r => r.required() }),
    defineField({
      name: 'paragraphs',
      title: 'Paragraphs',
      type: 'array',
      of: [{ type: 'localizedString' }],
      validation: r => r.min(0),
    }),
    defineField({
      name: 'icons',
      title: 'Tech Icons (slugs)',
      type: 'array',
      of: [{ type: 'string' }],
      options: { layout: 'tags' },
    }),
    defineField({
      name: 'order',
      title: 'Order',
      type: 'number',
      description: 'Lower first',
      validation: r => r.required().min(0),
    }),
  ],
  preview: {
    select: { title: 'name.es', subtitle: 'role.es' },
    prepare: (sel) => ({ title: sel.title || '(sin ES)', subtitle: sel.subtitle }),
  },
})
