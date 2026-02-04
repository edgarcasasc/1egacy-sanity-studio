import {defineField, defineType, defineArrayMember} from 'sanity'

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
        defineArrayMember({type: 'block'}), // Texto normal
        defineArrayMember({
          type: 'image', // Imágenes dentro del texto
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
          ]
        }),
        // --- NUEVO: SOPORTE PARA TABLAS ---
        defineArrayMember({
          type: 'table',
          title: 'Tabla de Datos',
        }),
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
      description: 'Asigna este artículo a un Clúster Temático. Obligatorio para la Autoridad Tópica.',
      validation: (rule) => rule.required(),
    }),

    // --- CAMPO PARA FAQs ---
    defineField({
      name: 'faqSection',
      title: 'Sección de Preguntas Frecuentes (FAQ)',
      description: 'Añade preguntas y respuestas comunes relacionadas con este artículo.',
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
              type: 'text', 
              rows: 4, 
              validation: (rule) => rule.required(),
            }),
          ],
          preview: {
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
    })
  ],
})