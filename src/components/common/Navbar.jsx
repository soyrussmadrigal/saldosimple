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
    >
      <div className="container flex items-center justify-between py-4">
        {/* Logo con enlace al home */}
        <Link href="/" onClick={handleLinkClick} className="flex items-center">
          <div className="relative w-32 sm:w-36 h-auto">
            <Image
              src={dark ? "/img/logo-light.svg" : "/img/logo.svg"}
              alt="SaldoSimple logo"
              layout="responsive"
              width={132}
              height={52}
              priority
            />
          </div>
        </Link>

        {/* Menú */}
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