// studio-1egacy-blog/schemaTypes/topicType.ts
import {defineField, defineType} from 'sanity'

export const topicType = defineType({
 name: 'topic',
 title: 'Clúster Temático',
 type: 'document',
 fields: [
  defineField({
   name: 'title',
   title: 'Nombre del Clúster (Ej: Liderazgo Estratégico)',
   type: 'string',
   validation: (rule) => rule.required(),
  }),
  defineField({
   name: 'slug',
   title: 'URL del Clúster (Ej: /blog/liderazgo)',
   type: 'slug',
   options: {source: 'title'},
   description: 'Ruta URL para esta categoría. Usar en la navegación del blog.',
   validation: (rule) => rule.required(),
  }),
  defineField({
   name: 'description',
   title: 'Descripción para SEO',
   type: 'text',
   rows: 2,
   description: 'Descripción única para el <meta> y el encabezado de la página de archivo del clúster. Vital para el SEO.',
  }),
 ],
 preview: {
  select: {
   title: 'title',
   subtitle: 'slug.current',
  },
 },
})