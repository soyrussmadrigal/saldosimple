import { definePlugin } from 'sanity';

export const lastEditedByPlugin = definePlugin({
  name: 'lastEditedByPlugin',
  document: {
    actions: (prev, { schemaType }) => {
      if (schemaType !== 'post') return prev; // Solo en posts

      return prev.map((action) => {
        if (action.action === 'publish') {
          return {
            ...action,
            onHandle: async (context) => {
              const { patch, publish, currentUser } = context;

              if (currentUser?.id) {
                patch.execute([{ set: { lastEditedBy: { _type: 'reference', _ref: currentUser.id } } }]);
              }

              publish.execute(); // Después de setear, publica
            },
          };
        }

        return action;
      });
    },
  },
});
