// studio-1egacy-blog/schemaTypes/postType.ts
import {defineField, defineType} from 'sanity'

export const postType = defineType({
  name: 'post',
  title: 'Post',
  type: 'document',
  fields: [
    defineField({ // title
      name: 'title',
      title: 'Título',
      type: 'string',
      validation: (rule) => rule.required(),
    }), // <<-- COMA
    defineField({ // subtitle
      name: 'subtitle',
      title: 'Subtítulo',
      type: 'string',
    }), // <<-- COMA
    defineField({ // slug
      name: 'slug',
      title: 'URL (Slug)',
      type: 'slug',
      options: {source: 'title'},
      validation: (rule) => rule.required(),
    }), // <<-- COMA
    defineField({ // publishedAt
      name: 'publishedAt',
      title: 'Fecha de Publicación',
      type: 'datetime',
      initialValue: () => new Date().toISOString(),
      validation: (rule) => rule.required(),
    }), // <<-- COMA
    defineField({ // mainImage
      name: 'mainImage',
      title: 'Imagen Principal',
      type: 'image',
      options: {
        hotspot: true,
      },
    }), // <<-- COMA
    defineField({ // body
      name: 'body',
      title: 'Contenido del Artículo',
      type: 'array',
      of: [ {type: 'block'}, {type: 'image'} ],
    }), // <<-- COMA // ¡Esta coma era probablemente la que faltaba antes de SEO!

    defineField({ // apellidosRelacionados
      name: 'apellidosRelacionados',
      title: 'Linajes Relacionados',
      description: 'Si este artículo es sobre linajes específicos, añádelos aquí.',
      type: 'array',
      of: [
        {
          type: 'reference',
          to: [{type: 'linaje'}],
        },
      ],
    }), // <<-- COMA // ¡Esta coma era probablemente la que faltaba antes de SEO!

    // --- CAMPOS DE SEO ---
    defineField({ // seoTitle
      name: 'seoTitle',
      title: 'Título SEO',
      description: 'Este es el título que aparecerá en Google...',
      type: 'string',
    }), // <<-- COMA // ¡Esta coma era probablemente la que faltaba!
    defineField({ // seoDescription
      name: 'seoDescription',
      title: 'Descripción SEO (Meta Description)',
      description: 'Una descripción corta (máx. 160 caracteres)...',
      type: 'text',
      rows: 3,
      validation: (rule) => rule.max(160),
    }), // <<-- COMA // ¡Esta coma era probablemente la que faltaba antes de Author!

    // --- CAMPO DE AUTOR ---
    defineField({ // author
      name: 'author',
      title: 'Autor',
      type: 'reference',
      to: [{type: 'author'}],
      validation: (rule) => rule.required(),
    }) // <<-- SIN COMA (es el último)
  ], // <<-- Aquí es donde esbuild esperaba el ']'
})