"use client";

export default function AuthorBox({ name, bio, image }) {
  return (
    <div className="w-full max-w-2xl mx-auto bg-gray-50 rounded-md p-6 flex items-center gap-5 shadow-sm">
      {image && (
        <img
          src={image}
          alt={`Foto de ${name}`}
          className="w-16 h-16 rounded-full object-cover"
        />
      )}
      <div>
        <h4 className="text-lg font-semibold text-gray-800">
          {name || "Autor desconocido"}
        </h4>
        {bio && <p className="text-sm text-gray-600 mt-1">{bio}</p>}
      </div>
    </div>
  );
}
