import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'siteSettings',
  title: 'Site Settings',
  type: 'document',
  // Treat as singleton — only one document of this type
  __experimental_actions: ['update', 'publish'],
  fields: [
    defineField({
      name: 'companyName',
      title: 'Company Name',
      type: 'string',
      description: 'Displayed in the nav logo and footer',
      validation: Rule => Rule.required(),
    }),
    defineField({
      name: 'phone',
      title: 'Phone Number',
      type: 'string',
      description: 'Display format, e.g. (330) 203-1666',
      validation: Rule => Rule.required(),
    }),
    defineField({
      name: 'email',
      title: 'Email Address',
      type: 'string',
      validation: Rule => Rule.email(),
    }),
    defineField({
      name: 'address',
      title: 'Business Address',
      type: 'string',
      description: 'Shown in the contact section',
    }),
  ],
  preview: {
    select: { title: 'companyName' },
  },
})
