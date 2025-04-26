"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

const Navbar = ({ dark }) => {
  const currentPath = usePathname();
  const [toggle, setToggle] = useState(false);

  const isActive = (routes) =>
    routes.some((route) => currentPath.includes(route)) ? "mil-active" : "";

  // Función para cerrar menú cuando se hace clic en un enlace
  const handleLinkClick = () => {
    setToggle(false);
  };

  return (
    <div className={`mil-top-panel ${dark ? "mil-dark-2" : ""}`}>
      <div className="container">
        <Link href="/" className="mil-logo" onClick={handleLinkClick}>
          <img
            src={dark ? "/img/logo-light.png" : "/img/logo.png"}
            alt="SaldoSimple"
            width={83}
            height={32}
          />
        </Link>

        <nav className={`mil-top-menu ${toggle ? "mil-active" : ""}`}>
          <ul>
            {/* Inicio */}
            <li className={currentPath === "/" ? "mil-active" : ""}>
              <Link href="/" onClick={handleLinkClick}>
                Inicio
              </Link>
            </li>

            {/* Artículos */}
            <li className={isActive(["articulos", "publication"])}>
              <Link href="/articulos" onClick={handleLinkClick}>
                Artículos
              </Link>
            </li>

            {/* Contacto */}
            <li className={isActive(["contact"])}>
              <Link href="/contact" onClick={handleLinkClick}>
                Contacto
              </Link>
            </li>
          </ul>
        </nav>

        <div className="mil-menu-buttons">
          {/* Botón hamburguesa */}
          <div
            className={`mil-menu-btn ${toggle ? "mil-active" : ""}`}
            onClick={() => setToggle(!toggle)}
          >
            <span />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
