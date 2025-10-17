// studio-1egacy-blog/schemaTypes/linajeType.ts
import {defineField, defineType} from 'sanity'

export const linajeType = defineType({
  name: 'linaje',
  title: 'Linaje (Apellido)',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Nombre del Apellido',
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
      title: 'Imagen del Escudo',
      type: 'image',
      options: {
        hotspot: true,
      },
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
  preview: {
    select: {
      title: 'title',
      media: 'escudo',
    },
  },
})