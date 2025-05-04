import Link from "next/link";
import Image from "next/image";

const Banner = ({
  title = "Your Ally for Financial Control",
  subTitle = "SaldoSimple",
  img = "img/home-2/1.png",
  style = { maxWidth: "135%", transform: "translateX(5%)" },
  dark = false,
}) => {
  return (
    <div className={`mil-banner mil-dissolve ${dark ? "mil-dark-2" : ""}`}>
      <div className="container">
        <div className="row align-items-center">
          <div className="col-xl-6">
            <div className="mil-banner-text">
              <h6 className="mil-text-gradient-2 mil-mb-20">{subTitle}</h6>
              <h1 className="mil-display mil-text-gradient-3 mil-mb-60">
                {title}
              </h1>
              <div className="mil-buttons-frame">
                <Link
                  href="herramientas"
                  className="mil-btn mil-md mil-add-arrow"
                >
                  Heramientas
                </Link>
              </div>
            </div>
          </div>
          <div className="col-xl-6">
            <div className="mil-banner-img">
              <Image
                src="/img/home-1/1.webp"
                alt="Banner"
                width={1200}
                height={600}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Banner;

export const PageBanner = ({
  title = "More than a Platform, a Financial Revolution",
  pageName = "About us",
}) => {
  return (
    <div className="mil-banner mil-banner-inner mil-dissolve">
      <div className="container">
        <div className="row align-items-center justify-content-center">
          <div className="col-xl-8">
            <div className="mil-banner-text mil-text-center">
              <div className="mil-text-m mil-mb-20">{pageName}</div>
              <h1 className="mil-mb-60">{title}</h1>
              <ul className="mil-breadcrumbs mil-center">
                <li>
                  <Link href="/">Home</Link>
                </li>
                <li>
                  <a href="#">{pageName}</a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
