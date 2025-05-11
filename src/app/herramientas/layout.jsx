export const metadata = {
  title: "Herramienta financiera",
  description: "Explora esta herramienta financiera útil para cualquier país.",
};

export default function HerramientasLayout({ children }) {
  return (
    <html lang="es">
      <body>
        <section className="max-w-3xl mx-auto p-6">
          {children}
        </section>
      </body>
    </html>
  );
}
