import Link from "next/link";
import Image from "next/image";

// 🔵 Banner principal para el home
const Banner = ({
  title = "Your Ally for Financial Control",
  subTitle = "SaldoSimple",
  img = "/img/home-1/1.webp",
  style = {},
  dark = false,
}) => {
  return (
    <div className={`mil-banner mil-dissolve ${dark ? "mil-dark-2" : ""}`}>
      <div className="container">
        <div className="row align-items-center">
          {/* Texto */}
          <div className="col-xl-6 col-12 mb-5 mb-xl-0">
            <div className="mil-banner-text text-center text-xl-start">
              <h6 className="mil-text-gradient-2 mil-mb-20">{subTitle}</h6>
              <h1 className="mil-display mil-text-gradient-3 mil-mb-40">
                {title}
              </h1>
              <div className="mil-buttons-frame justify-content-center justify-content-xl-start">
                <Link
                  href="/herramientas"
                  className="mil-btn mil-md mil-add-arrow"
                >
                  Herramientas
                </Link>
              </div>
            </div>
          </div>

          {/* Imagen principal del home */}
          <div className="col-xl-6 col-12">
            <div className="mil-banner-img d-flex justify-content-center">
              <div
                style={{
                  position: "relative",
                  width: "100%",
                  maxWidth: "500px",
                }}
              >
                <Image
                  src={img}
                  alt="banner"
                  width={800}
                  height={700}
                  style={{
                    width: "100%",
                    height: "auto",
                    borderRadius: "1rem",
                  }}
                  priority
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Banner;

// 🔶 Banner reutilizable con breadcrumb dinámico
export const PageBanner = ({ title, categoria = null }) => {
  return (
    <div className="mil-banner mil-banner-inner mil-dissolve">
      <div className="container">
        <div className="row align-items-center justify-content-center">
          <div className="col-xl-8">
            <div className="mil-banner-text mil-text-center">
              <h1 className="mil-mb-20">{title}</h1>
              <ul className="mil-breadcrumbs mil-center">
                <li>
                  <Link href="/">Inicio</Link>
                </li>
                <li>
                  <Link href="/articulos">Artículos</Link>
                </li>
                {categoria && (
                  <li className="capitalize">
                    {decodeURIComponent(categoria)}
                  </li>
                )}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
