import {defineConfig} from 'sanity'
import {structureTool} from 'sanity/structure'
import {visionTool} from '@sanity/vision'
import {schemaTypes} from './schemaTypes'
import {table} from '@sanity/table' // <--- 1. Importación del plugin

export default defineConfig({
  name: 'default',
  title: '1egacy-blog',

  projectId: '9pou5g3d',
  dataset: 'production',

  // 2. Registro del plugin en el array
  plugins: [
    structureTool(), 
    visionTool(),
    table(), 
  ],

  schema: {
    types: schemaTypes,
  },
})