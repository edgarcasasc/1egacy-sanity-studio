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


    // --- CAMPO AÑADIDO PARA GOOGLE ---
    defineField({
      name: 'shippingDetails',
      title: 'Detalles de Envío (Google)',
      type: 'object',
      description: 'Configuración de envío para Google Merchant Center.',
      fields: [
        defineField({
          name: 'shippingRate',
          title: 'Tarifa de Envío',
          type: 'object',
          fields: [
            defineField({
              name: 'value',
              title: 'Costo de envío (ej: 150)',
              type: 'number',
            }),
            defineField({
              name: 'currency',
              title: 'Moneda (ej: MXN)',
              type: 'string',
              initialValue: 'MXN',
            }),
          ],
        }),
      ],
    }),

    // --- CAMPO AÑADIDO PARA GOOGLE ---
    defineField({
      name: 'hasMerchantReturnPolicy',
      title: 'Política de Devolución (Google)',
      type: 'object',
      description: 'Configuración de devoluciones para Google Merchant Center.',
      fields: [
        defineField({
          name: 'merchantReturnDays',
          title: 'Días para Devolución (ej: 30)',
          type: 'number',
          validation: (rule) => rule.integer().min(0),
        }),
        defineField({
          name: 'refundType',
          title: 'Tipo de Reembolso',
          type: 'string',
          options: {
            list: [
              {title: 'Reembolso Completo', value: 'FullRefund'},
              {title: 'Crédito de Tienda', value: 'StoreCredit'},
              {title: 'Reembolso Parcial', value: 'PartialRefund'},
            ],
          },
          initialValue: 'FullRefund',
        }),
        defineField({
          name: 'returnPolicyCategory',
          title: 'Categoría de la Política',
          type: 'string',
          options: {
            list: [
              {
                title: 'Devolución por conveniencia',
                value: 'https://schema.org/MerchantReturnConvenience',
              },
              {
                title: 'Producto defectuoso',
                value: 'https://schema.org/MerchantReturnDefectiveProduct',
              },
            ],
          },
          initialValue: 'https://schema.org/MerchantReturnConvenience',
        }),
        defineField({
            name: 'returnPolicyUrl',
            title: 'URL de la Política de Devolución (Opcional)',
            type: 'url',
            description: 'Link a tu página de políticas de devolución si tienes una.'
        })
      ],
    }),

    // --- CAMPOS EXISTENTES ---
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