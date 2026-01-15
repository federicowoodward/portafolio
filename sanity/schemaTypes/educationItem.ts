import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'educationItem',
  title: 'Education Item',
  type: 'document',
  fields: [
    defineField({name: 'key', title: 'Key', type: 'string', validation: (r) => r.required()}), // QUALITY / ISO / CODER / PIL
    defineField({
      name: 'name',
      title: 'Name',
      type: 'localizedString',
      validation: (r) => r.required(),
    }),
    defineField({
      name: 'role',
      title: 'Role',
      type: 'localizedString',
      validation: (r) => r.required(),
    }),
    defineField({
      name: 'dates',
      title: 'Dates',
      type: 'localizedString',
      validation: (r) => r.required(),
    }),
    defineField({
      name: 'icons',
      title: 'Tech Icons (slugs)',
      type: 'array',
      of: [{type: 'string'}],
      options: {layout: 'tags'},
    }),
    defineField({
      name: 'hasCertificate',
      title: 'Has Certificate?',
      type: 'boolean',
      initialValue: false,
    }),
    defineField({
      name: 'certificate',
      title: 'Certificate Image (optional)',
      type: 'image',
      options: {hotspot: true},
    }),
    defineField({
      name: 'order',
      title: 'Order',
      type: 'number',
      validation: (r) => r.required().min(0),
    }),
  ],
  preview: {
    select: {title: 'name.es', subtitle: 'role.es', media: 'certificate'},
    prepare: (sel) => ({title: sel.title || '(sin ES)', subtitle: sel.subtitle, media: sel.media}),
  },
})
