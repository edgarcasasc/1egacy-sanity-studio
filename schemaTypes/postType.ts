// studio-1egacy-blog/schemaTypes/postType.ts
import {defineField, defineType, defineArrayMember} from 'sanity' // <-- Asegúrate de importar defineArrayMember

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
    }),
    defineField({ // subtitle
      name: 'subtitle',
      title: 'Subtítulo',
      type: 'string',
    }),
    defineField({ // slug
      name: 'slug',
      title: 'URL (Slug)',
      type: 'slug',
      options: {source: 'title'},
      validation: (rule) => rule.required(),
    }),
    defineField({ // publishedAt
      name: 'publishedAt',
      title: 'Fecha de Publicación',
      type: 'datetime',
      initialValue: () => new Date().toISOString(),
      validation: (rule) => rule.required(),
    }),

    defineField({ // mainImage
      name: 'mainImage',
      title: 'Imagen Principal',
      type: 'image',
      options: {
        hotspot: true,
      },
      fields: [
        defineField({
          name: 'alt',
          type: 'string',
          title: 'Texto Alternativo (Alt Text)',
          description: 'Describe la imagen para SEO y accesibilidad (importante).',
          isHighlighted: true,
          validation: Rule => Rule.warning('El texto alternativo es muy recomendable.')
        })
      ]
    }),

    defineField({ // body
      name: 'body',
      title: 'Contenido del Artículo',
      type: 'array',
      of: [
        defineArrayMember({type: 'block'}),
        defineArrayMember({
          type: 'image',
          options: {hotspot: true},
          fields: [
            defineField({
              name: 'alt',
              type: 'string',
              title: 'Texto Alternativo (Alt Text)',
              description: 'Describe la imagen para SEO y accesibilidad.',
              isHighlighted: true,
              validation: Rule => Rule.warning('El texto alternativo es muy recomendable.')
            }),
            // defineField({ name: 'caption', type: 'string', title: 'Leyenda' })
          ]
        })
      ],
    }),

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
    }),

    // --- CAMPOS DE SEO ---
    defineField({ // seoTitle
      name: 'seoTitle',
      title: 'Título SEO',
      description: 'Este es el título que aparecerá en Google...',
      type: 'string',
    }),
    defineField({ // seoDescription
      name: 'seoDescription',
      title: 'Descripción SEO (Meta Description)',
      description: 'Una descripción corta (máx. 160 caracteres)...',
      type: 'text',
      rows: 3,
      validation: (rule) => rule.max(160),
    }),
    defineField({ // topic
      name: 'topic',
      title: 'Clúster Temático Principal',
      type: 'reference',
      to: [{type: 'topic'}],
      description: 'Asigna este artículo a un Clúster Temático (Pilar de Contenido). Obligatorio para la Autoridad Tópica.',
      validation: (rule) => rule.required(),
    }),

    // --- CAMPO PARA FAQs ---
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
              // --- CAMBIO AQUÍ: Volvemos a 'text' para evitar el editor enriquecido ---
              type: 'text', // <<-- CAMBIO AQUÍ
              rows: 4, // Mantenemos las filas para un área de texto cómoda
              // --- FIN DEL CAMBIO ---
              validation: (rule) => rule.required(),
            }),
          ],
          preview: {
            select: {
              title: 'question',
              subtitle: 'answer', // La previsualización de 'text' sí funciona
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
    })
  ],
})