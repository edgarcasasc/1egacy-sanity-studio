// studio-1egacy-blog/schemaTypes/productType.ts
import {defineField, defineType} from 'sanity'

export const productType = defineType({
  name: 'product',
  title: 'Producto',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Nombre del Producto (Ej: Playera Legado Garza)',
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
      name: 'linaje', // Para saber a qué apellido pertenece
      title: 'Linaje Relacionado',
      type: 'reference',
      to: [{type: 'linaje'}],
    }),
    defineField({
      name: 'price',
      title: 'Precio (MXN)',
      type: 'number',
    }),
    defineField({
      name: 'description',
      title: 'Descripción Corta',
      type: 'text',
      rows: 3,
    }),
    defineField({
      name: 'gallery',
      title: 'Galería de Imágenes',
      type: 'array',
      of: [{type: 'image', options: {hotspot: true}}],
    }),
    defineField({
      name: 'variants',
      title: 'Variantes (Tallas y Colores)',
      type: 'array',
      of: [{type: 'variant'}],
    }),
  ],
})