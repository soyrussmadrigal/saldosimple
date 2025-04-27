export default function ExcerptBox({ excerpt }) {
  if (!excerpt) return null;

  return (
    <div className="excerpt-box">
      <p>{excerpt}</p>
    </div>
  );
}
