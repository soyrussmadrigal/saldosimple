"use client";

import Navbar from "@/components/Navbar"; // ✅ Importamos el nuevo Navbar

const Header = ({ dark }) => {
  return (
    <div className={`mil-top-panel ${dark ? "mil-dark-2" : ""}`}>
      <div className="container">
        {/* Insertamos el componente del menú */}
        <Navbar dark={dark} />
      </div>
    </div>
  );
};

export default Header;
