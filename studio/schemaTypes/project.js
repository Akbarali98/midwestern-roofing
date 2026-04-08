import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'project',
  title: 'Project',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Project Title',
      type: 'string',
      description: 'e.g. Full Roof Replacement',
      validation: Rule => Rule.required(),
    }),
    defineField({
      name: 'location',
      title: 'Location',
      type: 'string',
      description: 'e.g. Akron, OH',
      validation: Rule => Rule.required(),
    }),
    defineField({
      name: 'category',
      title: 'Category',
      type: 'string',
      options: {
        list: [
          {title: 'Roofing', value: 'roofing'},
          {title: 'Siding', value: 'siding'},
          {title: 'Gutters', value: 'gutters'},
          {title: 'Storm Damage', value: 'storm'},
        ],
        layout: 'radio',
      },
      validation: Rule => Rule.required(),
    }),
    defineField({
      name: 'beforePhoto',
      title: 'Before Photo',
      type: 'image',
      options: {hotspot: true},
      validation: Rule => Rule.required(),
    }),
    defineField({
      name: 'afterPhoto',
      title: 'After Photo',
      type: 'image',
      options: {hotspot: true},
      validation: Rule => Rule.required(),
    }),
    defineField({
      name: 'displayOrder',
      title: 'Display Order',
      type: 'number',
      description: 'Lower number appears first on the gallery page',
    }),
  ],
  preview: {
    select: {
      title: 'title',
      location: 'location',
      media: 'afterPhoto',
    },
    prepare({title, location, media}) {
      return {
        title,
        subtitle: location,
        media,
      }
    },
  },
})
