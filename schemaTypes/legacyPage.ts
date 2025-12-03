import { defineField, defineType } from 'sanity'

export const legacyPage = defineType({
  name: 'legacyPage',
  title: '🔐 Legados Privados (Bespoke)',
  type: 'document',
  fields: [
    defineField({
      name: 'clientEmail',
      title: 'Email del Cliente (Llave de Acceso)',
      type: 'string',
      description: 'CRÍTICO: Solo el usuario con este email podrá ver esta página en la Bóveda.',
      validation: (rule) => rule.required().email()
    }),
    defineField({
      name: 'title',
      title: 'Título del Legado (Ej: Familia Garza)',
      type: 'string',
    }),
    defineField({
      name: 'slug',
      title: 'URL Privada',
      type: 'slug',
      options: { 
        source: 'title',
        maxLength: 96
      },
      validation: (rule) => rule.required()
    }),
    defineField({
      name: 'finalShield',
      title: 'Escudo Restaurado (Imagen Final)',
      type: 'image',
      options: { hotspot: true }
    }),
    defineField({
      name: 'investigation',
      title: 'Investigación Genealógica (Texto para la IA)',
      type: 'array', 
      of: [{type: 'block'}],
      description: 'Este es el texto que leerá "El Artesano" (IA) para responder preguntas.'
    }),
    defineField({
      name: 'pdfFile',
      title: 'Archivo PDF Final (Descargable)',
      type: 'file'
    })
  ]
})