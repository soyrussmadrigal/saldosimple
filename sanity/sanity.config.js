import {defineConfig} from 'sanity'
import {structureTool} from 'sanity/structure'
import {visionTool} from '@sanity/vision'
import {schemaTypes} from './schemaTypes' // ← SOLO estos imports

export default defineConfig({
  name: 'default',
  title: 'SaldoSimple CMS',

  projectId: 'g88p7aul',
  dataset: 'production',

  plugins: [structureTool(), visionTool()],

  schema: {
    types: schemaTypes,
  },
})
