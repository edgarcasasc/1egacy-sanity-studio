import {defineField, defineType} from 'sanity'

export const linajeType = defineType({
  name: 'linaje',
  title: '🛡️ Linaje (Apellido)',
  type: 'document',
  // icon: () => '🛡️', 
  fields: [
    // --- IDENTIDAD ---
    defineField({
      name: 'title',
      title: 'Apellido',
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
    
    // --- ESCUDO Y ARTE ---
    defineField({
      name: 'escudo',
      title: 'Imagen del Escudo (Alta Resolución)',
      type: 'image',
      options: { hotspot: true },
      validation: (rule) => rule.required(),
    }),
    
    // Blasonamiento (Texto Rico)
    defineField({
      name: 'blason',
      title: 'Blasonamiento (Descripción Técnica)',
      description: 'Usa negritas para los colores o metales (ej. **Azur**, **Oro**).',
      type: 'array', 
      of: [{type: 'block'}]
    }),

    // --- NARRATIVA ---
    defineField({
      name: 'introduccion',
      title: 'Introducción Corta (Para Popups/Resumen)',
      type: 'text', 
      rows: 3,
    }),

    // --- VIDEOS (YOUTUBE & SCHEMA) ---
    defineField({
      name: 'videos',
      title: '🎬 Videos (YouTube)',
      description: 'Agrega uno o varios videos. El primero será el principal para Google.',
      type: 'array',
      of: [
        {
          type: 'object',
          title: 'Video',
          fields: [
            defineField({
              name: 'title',
              title: 'Título del Video',
              type: 'string',
              validation: rule => rule.required()
            }),
            defineField({
              name: 'description',
              title: 'Descripción (Para SEO)',
              type: 'text',
              rows: 2,
              validation: rule => rule.required()
            }),
            defineField({
              name: 'youtubeUrl',
              title: 'URL de YouTube',
              description: 'Ejemplo: https://www.youtube.com/watch?v=dQw4w9WgXcQ',
              type: 'url',
              validation: rule => rule.required()
            }),
            defineField({
              name: 'thumbnail',
              title: 'Portada del Video (Thumbnail)',
              description: 'Obligatorio para que Google muestre el video en los resultados.',
              type: 'image',
              options: { hotspot: true },
              validation: rule => rule.required()
            }),
            defineField({
              name: 'uploadDate',
              title: 'Fecha de Publicación',
              type: 'date',
              initialValue: () => new Date().toISOString().split('T')[0]
            }),
            defineField({
                name: 'duration',
                title: 'Duración (Formato ISO 8601)',
                description: 'Ejemplo: 1 minuto y 30 seg = PT1M30S. (PT = Period Time, M=Min, S=Sec)',
                type: 'string',
                initialValue: 'PT1M30S'
            })
          ],
          preview: {
            select: {
              title: 'title',
              media: 'thumbnail'
            }
          }
        }
      ]
    }),
    
    // Origen (Texto Rico)
    defineField({
      name: 'origen',
      title: 'Origen y Significado',
      type: 'array', 
      of: [{type: 'block'}]
    }),

    defineField({
      name: 'historia',
      title: 'Historia Completa del Linaje',
      type: 'array', 
      of: [{type: 'block'}]
    }),

    // --- METADATOS ---
    defineField({
      name: 'regiones',
      title: 'Regiones Comunes',
      description: 'Escribe la región y presiona Enter para agregarla.',
      type: 'array',
      of: [{type: 'string'}],
      options: {
        layout: 'tags'
      }
    }),

    // --- LÍNEA DE TIEMPO (HITOS) ---
    defineField({
      name: 'hitos',
      title: '⏳ Línea de Tiempo (Hitos Históricos)',
      description: 'Agrega los eventos clave para la línea de tiempo vertical.',
      type: 'array',
      of: [
        {
          type: 'object',
          title: 'Evento Histórico',
          fields: [
            defineField({ name: 'year', title: 'Año / Periodo', type: 'string' }),
            defineField({ name: 'title', title: 'Título del Evento', type: 'string' }),
            defineField({ name: 'description', title: 'Descripción', type: 'text', rows: 3 })
          ],
          preview: {
            select: { title: 'title', subtitle: 'year' }
          }
        }
      ]
    }),

    // --- DATOS PARA LA GRÁFICA ---
    defineField({
      name: 'estadisticas',
      title: '📊 Estadísticas de Expansión',
      description: 'Datos para la gráfica de barras.',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            defineField({ name: 'pais', title: 'País', type: 'string' }),
            defineField({ name: 'cantidad', title: 'Cantidad (Aprox)', type: 'number' })
          ],
          preview: {
            select: { title: 'pais', subtitle: 'cantidad' }
          }
        }
      ]
    }),

    // --- SEO & FAQs (NUEVA SECCIÓN) ---
    defineField({
      name: 'faqs',
      title: '❓ Preguntas Frecuentes (SEO & Usuario)',
      description: 'Añade preguntas específicas de ESTE apellido. Importante para aparecer en Google como Rich Result.',
      type: 'array',
      of: [
        {
          type: 'object',
          title: 'Item de FAQ',
          fields: [
            defineField({
              name: 'question',
              title: 'Pregunta',
              type: 'string',
              validation: (rule) => rule.required()
            }),
            defineField({
              name: 'answer',
              title: 'Respuesta',
              type: 'text', // Usamos text simple para facilitar el JSON-LD
              rows: 3,
              validation: (rule) => rule.required()
            })
          ],
          preview: {
            select: {
              title: 'question',
              subtitle: 'answer'
            }
          }
        }
      ]
    }),

    // --- CONEXIONES ---
    defineField({
      name: 'articulosRelacionados',
      title: 'Artículos del Blog Relacionados',
      type: 'array',
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