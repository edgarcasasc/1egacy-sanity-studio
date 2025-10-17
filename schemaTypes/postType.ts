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
  title: 'Linajes Relacionados',
  description: 'Si este artículo es sobre linajes específicos, añádelos aquí.',
  type: 'array',
  of: [
    {
      type: 'reference',
      to: [{type: 'linaje'}], // <--- AQUI ESTÁ LA MAGIA
    },
  ],
})
   

    // --- AÑADE ESTOS NUEVOS CAMPOS DE SEO ---
    defineField({
      name: 'seoTitle',
      title: 'Título SEO',
      description: 'Este es el título que aparecerá en Google. Si se deja vacío, usará el título principal.',
      type: 'string',
    }),
    defineField({
      name: 'seoDescription',
      title: 'Descripción SEO (Meta Description)',
      description: 'Una descripción corta (máx. 160 caracteres) para las vistas previas de Google.',
      type: 'text',
      rows: 3,
      validation: (rule) => rule.max(160),
    }),
    // --- FIN DEL NUEVO CAMPO ---
// ...
  ],
})