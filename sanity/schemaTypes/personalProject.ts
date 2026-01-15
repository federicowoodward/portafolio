import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'personalProject',
  title: 'Personal Project',
  type: 'document',
  fields: [
    defineField({ name: 'key',         title: 'Key',         type: 'string', validation: r => r.required() }), // random-number-api-web, angular-title-animation...
    defineField({ name: 'fullName',    title: 'Full Name',   type: 'string', validation: r => r.required() }), // user/repo
    defineField({ name: 'description', title: 'Description', type: 'localizedString', validation: r => r.required() }),
    defineField({ name: 'avatarUrl',   title: 'Avatar URL',  type: 'url', validation: r => r.required().uri({}) }),
    defineField({ name: 'htmlUrl',     title: 'Repo URL',    type: 'url', validation: r => r.required().uri({}) }),
    defineField({ name: 'order',       title: 'Order',       type: 'number', validation: r => r.required().min(0) }),
  ],
  preview: {
    select: { title: 'fullName', subtitle: 'description.es' },
    prepare: ({ title, subtitle }) => ({ title, subtitle })
  }
})
