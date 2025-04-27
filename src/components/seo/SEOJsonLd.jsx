"use client";

export default function SEOJsonLd({ schemas = {} }) {
  return (
    <>
      {Object.entries(schemas).map(([key, schema], index) => (
        schema ? (
          <script
            key={key + index}
            type="application/ld+json"
            dangerouslySetInnerHTML={{
              __html: JSON.stringify(schema, null, 2),
            }}
          />
        ) : null
      ))}
    </>
  );
}
