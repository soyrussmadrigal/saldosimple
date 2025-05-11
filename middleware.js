import { NextResponse } from "next/server";

export function middleware(request) {
  const pathname = request.nextUrl.pathname;

  // Detecta si estamos en la ruta de herramientas
  const lang = pathname.startsWith("/herramientas") ? "es" : "es-MX";

  const response = NextResponse.next();
  response.headers.set("x-lang", lang);

  return response;
}

// Opcional pero recomendado: evita que corra en /_next, /api, /studio, etc.
export const config = {
  matcher: ["/((?!_next|favicon.ico|api|studio).*)"],
};
