// studio-1egacy-blog/schemaTypes/categoryType.ts
import {defineField, defineType} from 'sanity'

export const categoryType = defineType({
  name: 'category',
  title: 'Categoría de Producto',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Nombre de la Categoría (Ej: Ropa, Códices)',
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
    // Puedes añadir otros campos si lo necesitas, como una descripción
  ],
  preview: {
    select: {
      title: 'title',
    },
  },
})