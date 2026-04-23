import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'servicePage',
  title: 'Service Pages',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Service Name',
      type: 'string',
      readOnly: true,
      description: 'Service name (for reference only)',
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      readOnly: true,
      description: 'Internal identifier — do not change',
      options: { source: 'title' },
    }),
    defineField({
      name: 'heroImage',
      title: 'Service Image',
      type: 'image',
      description: 'The main image shown on this service page.',
      options: { hotspot: true },
    }),
  ],
  preview: {
    select: { title: 'title', media: 'heroImage' },
  },
})
