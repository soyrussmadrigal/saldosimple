'use client';

import * as Tooltip from '@radix-ui/react-tooltip';

export default function TooltipFactChecked({ children, tooltipText }) {
  return (
    <Tooltip.Provider>
      <Tooltip.Root>
        <Tooltip.Trigger asChild>
          {children}
        </Tooltip.Trigger>
        <Tooltip.Portal>
          <Tooltip.Content
            className="bg-black text-white text-xs rounded py-1 px-2 max-w-xs text-center"
            side="top"
            sideOffset={8}
          >
            {tooltipText}
            <Tooltip.Arrow className="fill-black" />
          </Tooltip.Content>
        </Tooltip.Portal>
      </Tooltip.Root>
    </Tooltip.Provider>
  );
}
