import {defineField, defineType} from 'sanity'

export const linajeType = defineType({
  name: 'linaje',
  title: '🛡️ Linaje (Apellido)',
  type: 'document',
  // icon: () => '🛡️', // Comentamos esto para evitar errores de TS si no tienes iconos configurados
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