import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'collabProject',
  title: 'Collaborative Project',
  type: 'document',
  fields: [
    defineField({ name: 'key',   title: 'Key',   type: 'string', validation: r => r.required() }), // encode, tokelab...
    defineField({ name: 'title', title: 'Title', type: 'localizedString', validation: r => r.required() }),
    defineField({ name: 'url',   title: 'URL',   type: 'url', validation: r => r.required().uri({}) }),
    defineField({ name: 'order', title: 'Order', type: 'number', validation: r => r.required().min(0) }),
    defineField({ name: 'iframeAllowed', title: 'Iframe allowed?', type: 'boolean', initialValue: true }),
  ],
  preview: {
    select: { title: 'title.es', subtitle: 'url' },
    prepare: ({ title, subtitle }) => ({ title: title || '(sin ES)', subtitle })
  }
})
