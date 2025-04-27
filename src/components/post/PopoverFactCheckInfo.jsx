'use client';

import * as Popover from '@radix-ui/react-popover';

export default function PopoverFactCheckInfo() {
  return (
    <Popover.Root>
      <Popover.Trigger asChild>
        <button className="text-blue-600 text-xs hover:underline mt-1">
          ¿Cómo verificamos los hechos?
        </button>
      </Popover.Trigger>
      <Popover.Portal>
        <Popover.Content
          className="p-4 bg-white rounded-md shadow-md border max-w-sm text-gray-700 text-sm"
          side="top"
          sideOffset={8}
        >
          <p><strong>Proceso de Verificación:</strong> Todos los artículos son revisados por nuestro equipo editorial y validados con fuentes primarias confiables. Nuestro objetivo es brindar información precisa y transparente.</p>
          <Popover.Arrow className="fill-white" />
        </Popover.Content>
      </Popover.Portal>
    </Popover.Root>
  );
}
