import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'homePage',
  title: 'Home Page',
  type: 'document',
  __experimental_actions: ['update', 'publish'],
  groups: [
    {name: 'hero',     title: 'Hero'},
    {name: 'why',      title: 'About / Why Us'},
    {name: 'values',   title: 'Values'},
    {name: 'services', title: 'Services'},
    {name: 'process',  title: 'Process Steps'},
    {name: 'faq',      title: 'FAQ'},
    {name: 'areas',    title: 'Service Areas'},
  ],
  fields: [

    // ── HERO ─────────────────────────────────────────────────
    defineField({
      name: 'heroEyebrow',
      title: 'Eyebrow Text',
      type: 'string',
      description: 'Small label above the headline, e.g. "Northeast Ohio\'s #1 Rated Roofer"',
      group: 'hero',
    }),
    defineField({
      name: 'heroHeadline',
      title: 'Headline (main text)',
      type: 'string',
      description: 'e.g. "Top-Rated Roofing Services"',
      group: 'hero',
    }),
    defineField({
      name: 'heroHeadlineAccent',
      title: 'Headline (orange highlighted text)',
      type: 'string',
      description: 'e.g. "in Northeast Ohio" — displayed in orange',
      group: 'hero',
    }),
    defineField({
      name: 'heroSubheadline',
      title: 'Subheadline Paragraph',
      type: 'text',
      rows: 3,
      group: 'hero',
    }),
    defineField({
      name: 'heroImage',
      title: 'Hero Image',
      type: 'image',
      options: {hotspot: true},
      group: 'hero',
    }),
    defineField({
      name: 'heroTrustItems',
      title: 'Trust Checklist Items',
      type: 'array',
      of: [{type: 'string'}],
      description: 'The 3 checkmark items below the buttons',
      validation: Rule => Rule.max(3),
      group: 'hero',
    }),

    // ── WHY / ABOUT ───────────────────────────────────────────
    defineField({
      name: 'whyEyebrow',
      title: 'Eyebrow Text',
      type: 'string',
      group: 'why',
    }),
    defineField({
      name: 'whyHeadlinePre',
      title: 'Headline — text before orange word',
      type: 'string',
      description: 'e.g. "Why Choose"',
      group: 'why',
    }),
    defineField({
      name: 'whyHeadlineAccent',
      title: 'Headline — orange word',
      type: 'string',
      description: 'e.g. "MidWestern"',
      group: 'why',
    }),
    defineField({
      name: 'whyHeadlinePost',
      title: 'Headline — text after orange word',
      type: 'string',
      description: 'e.g. "Construction?"',
      group: 'why',
    }),
    defineField({
      name: 'whyBody1',
      title: 'Body Paragraph 1',
      type: 'text',
      rows: 3,
      group: 'why',
    }),
    defineField({
      name: 'whyBody2',
      title: 'Body Paragraph 2',
      type: 'text',
      rows: 3,
      group: 'why',
    }),
    defineField({
      name: 'whyStatNumber',
      title: 'Stat Number',
      type: 'string',
      description: 'e.g. "5,000+"',
      group: 'why',
    }),
    defineField({
      name: 'whyStatLabel',
      title: 'Stat Label',
      type: 'string',
      description: 'e.g. "Roofs Completed"',
      group: 'why',
    }),
    defineField({
      name: 'whyImage',
      title: 'Section Image',
      type: 'image',
      options: {hotspot: true},
      group: 'why',
    }),

    // ── VALUES ────────────────────────────────────────────────
    defineField({
      name: 'values',
      title: 'Value Cards',
      type: 'array',
      of: [{
        type: 'object',
        fields: [
          {name: 'icon',        title: 'Icon (emoji)',  type: 'string'},
          {name: 'title',       title: 'Title',         type: 'string'},
          {name: 'description', title: 'Description',   type: 'text', rows: 3},
        ],
        preview: {select: {title: 'title', subtitle: 'icon'}},
      }],
      validation: Rule => Rule.max(3),
      group: 'values',
    }),

    // ── SERVICES ──────────────────────────────────────────────
    defineField({
      name: 'services',
      title: 'Service Cards',
      type: 'array',
      of: [{
        type: 'object',
        fields: [
          {name: 'number',      title: 'Number & Category (e.g. "01 — Roofing")', type: 'string'},
          {name: 'title',       title: 'Service Title',   type: 'string'},
          {name: 'description', title: 'Description',     type: 'text', rows: 3},
        ],
        preview: {select: {title: 'title', subtitle: 'number'}},
      }],
      validation: Rule => Rule.max(6),
      group: 'services',
    }),

    // ── PROCESS ───────────────────────────────────────────────
    defineField({
      name: 'processSteps',
      title: 'Process Steps',
      type: 'array',
      of: [{
        type: 'object',
        fields: [
          {name: 'title',       title: 'Step Title',   type: 'string'},
          {name: 'description', title: 'Description',  type: 'text', rows: 2},
        ],
        preview: {select: {title: 'title'}},
      }],
      validation: Rule => Rule.max(4),
      group: 'process',
    }),

    // ── FAQ ───────────────────────────────────────────────────
    defineField({
      name: 'faqs',
      title: 'FAQ Items',
      type: 'array',
      of: [{
        type: 'object',
        fields: [
          {name: 'question', title: 'Question', type: 'string'},
          {name: 'answer',   title: 'Answer',   type: 'text', rows: 3},
        ],
        preview: {select: {title: 'question'}},
      }],
      group: 'faq',
    }),

    // ── SERVICE AREAS ─────────────────────────────────────────
    defineField({
      name: 'serviceAreas',
      title: 'Service Area Cities',
      type: 'array',
      of: [{type: 'string'}],
      description: 'Each entry is one city tag, e.g. "Akron", "Cleveland"',
      group: 'areas',
    }),
  ],
})
