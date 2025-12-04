import {defineField, defineType} from 'sanity'

export const linajeType = defineType({
  name: 'linaje',
  title: '🛡️ Linaje (Apellido)',
  type: 'document',
  icon: () => '🛡️',
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

    // --- METADATOS (CAMBIO AQUI) ---
    defineField({
      name: 'regiones',
      title: 'Regiones Comunes',
      description: 'Escribe la región y presiona Enter para agregarla.',
      type: 'array',
      of: [{type: 'string'}],
      options: {
        layout: 'tags' // Permite escribir libremente
      }
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