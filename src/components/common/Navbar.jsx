"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

const Navbar = ({ dark }) => {
  const currentPath = usePathname();
  const [toggle, setToggle] = useState(false);

  const isActive = (routes) =>
    routes.some((route) => currentPath.includes(route)) ? "mil-active" : "";

  const handleLinkClick = () => {
    setToggle(false);
  };

  return (
    <div
      className={`fixed top-0 left-0 w-full z-50 ${dark ? "mil-dark-2" : "bg-white shadow"}`}
      style={{ position: "fixed", top: 0, left: 0, width: "100%", zIndex: 50 }}
    >
      <div className="container flex items-center justify-between py-4">
        {/* Logo */}
        <Link href="/" className="mil-logo" onClick={handleLinkClick}>
          <img
            src={dark ? "/img/logo-light.png" : "/img/logo.png"}
            alt="SaldoSimple"
            width={83}
            height={32}
          />
        </Link>

        {/* Menu */}
        <nav className={`mil-top-menu ${toggle ? "mil-active" : ""}`}>
          <ul className="mil-nav-list">
            <li className={currentPath === "/" ? "mil-active" : ""}>
              <Link href="/" onClick={handleLinkClick}>
                Inicio
              </Link>
            </li>

            <li className={isActive(["articulos", "publication"])}>
              <Link href="/articulos" onClick={handleLinkClick}>
                Artículos
              </Link>
            </li>

            <li className={isActive(["contact"])}>
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
