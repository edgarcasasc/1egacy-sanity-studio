// studio-1egacy-blog/schemaTypes/linajeType.ts
import {defineField, defineType} from 'sanity'

export const linajeType = defineType({
  name: 'linaje',
  title: 'Linaje',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Apellido (Ej: Garza)',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'URL (Slug)',
      type: 'slug',
      options: {source: 'title'},
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'escudo',
      title: 'Escudo de Armas (SVG)',
      type: 'image', // Sanity maneja SVGs perfectamente en el campo de imagen
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'descripcionEscudo',
      title: 'Descripción del Escudo',
      type: 'text',
      rows: 4,
    }),
    defineField({
      name: 'introduccion',
      title: 'Introducción (para el popup)',
      type: 'text',
      rows: 4,
    }),
    defineField({
      name: 'articulosRelacionados',
      title: 'Artículos Relacionados',
      type: 'array',
      // Esto nos permite enlazar directamente a los posts que ya existen en tu blog
      of: [{type: 'reference', to: [{type: 'post'}]}],
    }),
  ],
})