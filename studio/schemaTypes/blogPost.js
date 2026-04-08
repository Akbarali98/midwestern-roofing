import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'blogPost',
  title: 'Blog Posts',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      readOnly: true,
      description: 'Post title (for reference — edit the HTML file to change this)',
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
      title: 'Hero Image',
      type: 'image',
      description: 'The main banner image shown at the top of the article and on the blog listing card.',
      options: { hotspot: true },
    }),
  ],
  preview: {
    select: { title: 'title', media: 'heroImage' },
  },
})
