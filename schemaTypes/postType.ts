// studio-1egacy-blog/schemaTypes/postType.ts
import {defineField, defineType} from 'sanity'

export const postType = defineType({
  name: 'post',
  title: 'Post',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Título',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'subtitle',
      title: 'Subtítulo',
      type: 'string',
    }),
    defineField({
      name: 'slug',
      title: 'URL (Slug)',
      type: 'slug',
      options: {source: 'title'},
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'publishedAt',
      title: 'Fecha de Publicación',
      type: 'datetime',
      initialValue: () => new Date().toISOString(),
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'mainImage',
      title: 'Imagen Principal',
      type: 'image',
      options: {
        hotspot: true, // Permite recortar la imagen de forma inteligente
      },
    }),
    // ... (dentro del array 'fields' en postType.ts)
    defineField({
      name: 'body',
      title: 'Contenido del Artículo',
      type: 'array',
      of: [ {type: 'block'}, {type: 'image'} ],
    }),

    // --- AÑADE ESTE NUEVO CAMPO ---
    defineField({
      name: 'apellidosRelacionados',
      title: 'Apellidos Relacionados (Etiquetas)',
      description: 'Si este artículo es sobre apellidos específicos, añádelos aquí. Si es genérico, déjalo vacío.',
      type: 'array',
      of: [{type: 'string'}],
      options: {
        layout: 'tags'
      }
    }),
    // --- FIN DEL NUEVO CAMPO ---
// ...
  ],
})