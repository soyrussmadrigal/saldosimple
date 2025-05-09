import Link from "next/link";
import Image from "next/image";

// 🔵 Banner principal para el home
const Banner = ({
  title = "Your Ally for Financial Control",
  subTitle = "SaldoSimple",
  img = "/img/home-1/1.webp", // Imagen principal
  dark = false,
}) => {
  return (
    <div className={`mil-banner mil-dissolve ${dark ? "mil-dark-2" : ""}`}>
      <div className="container">
        <div className="row align-items-center">
          {/* Texto */}
          <div className="col-xl-6">
            <div className="mil-banner-text">
              <h6 className="mil-text-gradient-2 mil-mb-20">{subTitle}</h6>
              <h1 className="mil-display mil-text-gradient-3 mil-mb-60">
                {title}
              </h1>
              <div className="mil-buttons-frame">
                <Link
                  href="/herramientas"
                  className="mil-btn mil-md mil-add-arrow"
                >
                  Herramientas
                </Link>
              </div>
            </div>
          </div>

          {/* Imagen sin flash */}
          <div className="col-xl-6">
            <div className="mil-banner-img relative w-full h-[300px] md:h-[400px] lg:h-[500px]">
              <Image
                src={img}
                alt="Banner"
                fill
                className="object-cover rounded-xl"
                sizes="(max-width: 768px) 100vw, 50vw"
                priority
              />
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
