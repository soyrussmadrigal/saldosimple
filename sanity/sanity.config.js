import { defineConfig } from 'sanity';
import { structureTool } from 'sanity/structure';
import { visionTool } from '@sanity/vision';
import { schemaTypes } from './schemaTypes';
import { lastEditedByPlugin } from './plugins/lastEditedByPlugin'; // ✅ Import del plugin de edición

export default defineConfig({
  name: 'default',
  title: 'SaldoSimple CMS', // ✅ Bien puesto tu título personalizado

  projectId: 'g88p7aul',
  dataset: 'production',

  plugins: [
    structureTool(),
    visionTool(),
    lastEditedByPlugin(), // ✅ Activamos aquí el plugin
  ],

  schema: {
    types: schemaTypes,
  },
});
