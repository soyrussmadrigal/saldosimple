export default function ExcerptBox({ excerpt }) {
  if (!excerpt) return null;

  return (
    <div className="text-black text-lg leading-relaxed mb-6">
      {excerpt}
    </div>
  );
}
