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
      validation: (Rule) => Rule.min(1).max(5),
    }),
    defineField({
      name: 'reviewCount',
      title: 'Número de Reseñas',
      type: 'number',
      description: 'Total de reseñas recibidas',
      validation: (Rule) => Rule.integer().min(0),
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

    // --- CAMPO DE ENVÍO (CORREGIDO PARA VALIDATOR) ---
    defineField({
      name: 'shippingDetails',
      title: 'Reglas de Envío (Google)',
      type: 'array',
      description: 'Añade una o más reglas. Ej: una para "Nuevo León" y otra para "Resto de México".',
      of: [
        {
          type: 'object',
          name: 'shippingRule',
          title: 'Regla de Envío',
          fields: [
            defineField({
              name: 'shippingDestination',
              title: 'Destino de Envío',
              type: 'object',
              fields: [
                defineField({
                  name: 'addressCountry',
                  title: 'País (Código de 2 letras)',
                  type: 'string',
                  initialValue: 'MX',
                }),
                defineField({
                  name: 'addressRegion',
                  title: 'Estado (Opcional, Código ej: NL, CMX, JAL)',
                  type: 'string',
                  description: 'Déjalo vacío para aplicar a todo el país (MX).',
                }),
              ],
            }),
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
            // --- AQUÍ ESTÁ LA CORRECCIÓN anidando 'transitTime' ---
            defineField({
              name: 'deliveryTime',
              title: 'Tiempo de Entrega (Opcional)',
              type: 'object',
              fields: [
                defineField({
                  name: 'transitTime', // <-- El sub-objeto que faltaba
                  title: 'Tiempo de Tránsito',
                  type: 'object',
                  fields: [
                    defineField({name: 'minValue', title: 'Días Mínimo (ej: 3)', type: 'number'}),
                    defineField({name: 'maxValue', title: 'Días Máximo (ej: 5)', type: 'number'}),
                    defineField({
                      name: 'unitCode',
                      title: 'Unidad',
                      type: 'string',
                      initialValue: 'DAY',
                      readOnly: true,
                    }),
                  ],
                }),
              ],
            }),
            // --- FIN DE LA CORRECCIÓN ---
          ],
        },
      ],
    }),

    // --- CAMPO DE DEVOLUCIONES (CORREGIDO PARA VALIDATOR) ---
    defineField({
      name: 'hasMerchantReturnPolicy',
      title: 'Política de Devolución (Google)',
      type: 'object',
      description: 'Configuración de devoluciones para Google Merchant Center.',
      fields: [
        defineField({
          name: 'returnPolicyCategory',
          title: 'Categoría de la Política',
          type: 'string',
          options: {
            list: [
              {
                title: 'Ventana de Devolución Finita',
                value: 'https://schema.org/MerchantReturnFiniteReturnWindow',
              },
              {
                title: 'Ventana de Devolución Ilimitada',
                value: 'https://schema.org/MerchantReturnUnlimitedReturnWindow',
              },
              {
                title: 'No se permiten devoluciones',
                value: 'https://schema.org/MerchantReturnNotPermitted',
              },
            ],
          },
          initialValue: 'https://schema.org/MerchantReturnFiniteReturnWindow',
        }),
        defineField({
          name: 'merchantReturnDays',
          title: 'Días para Devolución (si la ventana es finita)',
          type: 'number',
          validation: (rule) => rule.integer().min(0),
        }),
        // --- AQUÍ ESTÁ LA CORRECCIÓN (valores son URLs) ---
        defineField({
          name: 'refundType',
          title: 'Tipo de Reembolso',
          type: 'string',
          options: {
            list: [
              {title: 'Reembolso Completo', value: 'https://schema.org/FullRefund'},
              {title: 'Crédito de Tienda', value: 'https://schema.org/StoreCredit'},
            ],
          },
          initialValue: 'https://schema.org/FullRefund',
        }),
        // --- FIN DE LA CORRECCIÓN ---
        defineField({
          name: 'applicableCountry',
          title: 'País donde aplica (Opcional, ej: MX)',
          type: 'string',
          initialValue: 'MX',
        }),
        // El campo 'returnPolicyUrl' se ELIMINÓ porque no es válido aquí
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