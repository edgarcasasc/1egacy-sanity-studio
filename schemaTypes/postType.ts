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


    // --- AÑADE ESTE NUEVO CAMPO PARA FAQs ---
    defineField({
      name: 'faqSection',
      title: 'Sección de Preguntas Frecuentes (FAQ)',
      description: 'Añade preguntas y respuestas comunes relacionadas con este artículo. Ideal para SEO y Vistas Generales de IA.',
      type: 'array',
      of: [
        {
          type: 'object',
          name: 'qaPair',
          title: 'Par Pregunta/Respuesta',
          fields: [
            defineField({
              name: 'question',
              title: 'Pregunta',
              type: 'string',
              validation: (rule) => rule.required(),
            }),
            defineField({
              name: 'answer',
              title: 'Respuesta',
              type: 'text', // Usamos 'text' para respuestas más largas
              rows: 4,
              validation: (rule) => rule.required(),
            }),
          ],
          preview: { // Para que se vea bien en el Studio
            select: {
              title: 'question',
              subtitle: 'answer',
            },
          },
        },
      ],
    }),

    
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