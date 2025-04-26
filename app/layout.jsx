import { Questrial } from "next/font/google";

import "@fonts/css/switzer.css";
import "./globals.css";
import "@fonts/font-awesome.min.css";
import "@css/plugins/bootstrap-grid.css";
import "@css/plugins/swiper.min.css";
import "@css/plugins/magnific-popup.css";
import "@css/style.css";

// Fuente secundaria configurada
const secondaryFont = Questrial({
  weight: ["400"],
  style: ["normal"],
  subsets: ["latin"],
  variable: "--font-secondary",
  display: "swap",
  adjustFontFallback: false,
});

// Metadata base del sitio
export const metadata = {
  title: "SaldoSimple - Controla tus Finanzas",
  description: "La plataforma para calcular, comparar y entender tus finanzas en Costa Rica.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="es-CR" className={secondaryFont.variable}>
      <body>{children}</body>
    </html>
  );
}
