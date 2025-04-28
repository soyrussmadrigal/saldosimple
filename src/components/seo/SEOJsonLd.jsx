"use client";

export default function SEOJsonLd({ schemas }) {
  if (!schemas) return null;

  const schemaArray = Object.values(schemas);

  return (
    <>
      {schemaArray.map((schema, index) => (
        <script
          key={index}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
      ))}
    </>
  );
}
