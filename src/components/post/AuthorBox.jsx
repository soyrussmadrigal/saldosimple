"use client";

import {
  FaLinkedin,
  FaTwitter,
  FaFacebook,
  FaGlobe,
} from "react-icons/fa";

const platformIcons = {
  linkedin: <FaLinkedin />,
  twitter: <FaTwitter />,
  facebook: <FaFacebook />,
  website: <FaGlobe />,
};

export default function AuthorBox({ name, bio, image, socialLinks = [] }) {
  return (
    <div className="w-full max-w-2xl mx-auto bg-gray-50 rounded-md p-6 flex flex-col sm:flex-row items-center sm:items-start gap-5 shadow-sm">
      {image && (
        <img
          src={image}
          alt={`Foto de ${name}`}
          className="w-20 h-20 rounded-full object-cover"
        />
      )}
      <div className="text-center sm:text-left w-full">
        <h4 className="text-lg font-semibold text-gray-800">
          {name || "Autor desconocido"}
        </h4>
        {bio && <p className="text-sm text-gray-600 mt-2">{bio}</p>}

        {socialLinks.length > 0 && (
          <div className="flex justify-center sm:justify-start gap-4 mt-3 text-gray-500 text-xl">
            {socialLinks.map((link, index) => (
              <a
                key={index}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-blue-600 transition-colors"
                title={link.platform}
              >
                {platformIcons[link.platform] || <FaGlobe />}
              </a>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
