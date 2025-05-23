// src/components/ui/UnpublishedBanner.jsx
"use client";

import { useState } from "react";

export default function UnpublishedBanner() {
  const [visible, setVisible] = useState(true);

  if (!visible) return null;

  return (
    <div className="bg-yellow-100 text-yellow-900 px-4 py-3 text-sm text-center font-medium">
      Esta herramienta aún no ha sido publicada. Solo tú puedes verla.
    </div>
  );
}
