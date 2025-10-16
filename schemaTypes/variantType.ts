// studio-1egacy-blog/schemaTypes/variantType.ts
import {defineField, defineType} from 'sanity'

export const variantType = defineType({
  name: 'variant',
  title: 'Variante',
  type: 'object',
  fields: [
    defineField({
      name: 'size',
      title: 'Talla (Ej: M, G, XG)',
      type: 'string',
    }),
    defineField({
      name: 'color',
      title: 'Color (Ej: Negro, Blanco)',
      type: 'string',
    }),
  ],
})