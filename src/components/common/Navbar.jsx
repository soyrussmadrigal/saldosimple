"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useState } from "react";

const Navbar = ({ dark }) => {
  const currentPath = usePathname();
  const [toggle, setToggle] = useState(false);

  const handleLinkClick = () => {
    setToggle(false);
  };

  return (
    <div
      className={`fixed top-0 left-0 w-full z-50 ${
        dark ? "mil-dark-2" : "bg-white shadow"
      }`}
      style={{ position: "fixed", top: 0, left: 0, width: "100%", zIndex: 50 }}
    >
      <div className="container flex items-center justify-between py-4">
        {/* Logo */}
          <Image
            src={dark ? "/img/logo-light.png" : "/img/logo.png"}
            alt="SaldoSimple"
            width={83}
            height={32}
            priority
          />
         

        {/* Menu */}
        <nav className={`mil-top-menu ${toggle ? "mil-active" : ""}`}>
          <ul className="mil-nav-list">
            <li className={currentPath === "/" ? "mil-active" : ""}>
              <Link href="/" onClick={handleLinkClick}>
                Inicio
              </Link>
            </li>

            <li
              className={
                currentPath.startsWith("/articulos") ? "mil-active" : ""
              }
            >
              <Link href="/articulos" onClick={handleLinkClick}>
                Artículos
              </Link>
            </li>

            <li
              className={
                currentPath.startsWith("/herramientas") ? "mil-active" : ""
              }
            >
              <Link href="/herramientas" onClick={handleLinkClick}>
                Herramientas
              </Link>
            </li>

            <li
              className={currentPath.startsWith("/contact") ? "mil-active" : ""}
            >
              <Link href="/contact" onClick={handleLinkClick}>
                Contacto
              </Link>
            </li>
          </ul>
        </nav>

        {/* Botón hamburguesa */}
        <div className="mil-menu-buttons">
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
