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
          name: 'category', // Nombre técnico del campo
          title: 'Categoría', // Nombre visible en el Studio
          type: 'reference', // Indica que es una referencia a otro documento
          to: [{type: 'category'}], // Especifica que apunta a documentos de tipo 'category'
          validation: (rule) => rule.required(), // Opcional: si quieres que sea obligatorio
          description: 'Selecciona la categoría principal del producto.',
        }),
    defineField({
      name: 'price',
      title: 'Precio (MXN)',
      type: 'number',
    }),
    defineField({
      name: 'rating',
      title: 'Valoración (Rating)',
      type: 'number',
      description: 'El rating promedio (ej. 4.5)',
      validation: Rule => Rule.min(1).max(5),
    }),
    defineField({
      name: 'reviewCount',
      title: 'Número de Reseñas',
      type: 'number',
      description: 'Total de reseñas recibidas',
      validation: Rule => Rule.integer().min(0),
    }),
    defineField({
      name: 'priceCurrency',
      title: 'Moneda del Precio',
      type: 'string',
      description: "Código de moneda (ej. 'MXN' o 'USD')",
      initialValue: 'MXN',
    }),
    defineField({
      name: 'priceValidUntil',
      title: 'Validez del Precio (Oferta) Hasta',
      type: 'date',
      options: {
        dateFormat: 'YYYY-MM-DD',
      },
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