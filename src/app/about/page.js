import { CallToAction2 } from "@/components/sections/CallToAction";
import PlaxLayout from "@/layouts/PlaxLayout";
import Link from "next/link";

const page = () => {
  return (
    <PlaxLayout bg={false}>
      <div className="mil-banner mil-banner-inner mil-dissolve">
        <div className="container">
          <div className="row align-items-center justify-content-center">
            <div className="col-xl-8">
              <div className="mil-banner-text mil-text-center">
                <div className="mil-text-m mil-mb-20">About us</div>
                <h1 className="mil-mb-60">
                  More than a Platform, a Financial Revolution
                </h1>
                <ul className="mil-breadcrumbs mil-center">
                  <li>
                    <Link href="/">Home</Link>
                  </li>
                  <li>
                    <Link href="/about">About us</Link>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ... resto del contenido ... */}

      <div className="mil-icon-box">
        <img
          src="img/inner-pages/icons/2.svg"
          alt="icon"
          className="mil-mb-30 mil-up"
        />
        <h5 className="mil-mb-20 mil-up">Robust Security</h5>
        <p className="mil-text-m mil-soft mil-up">
          Learn about the security standards that are at the heart of Plax,
          guaranteeing the protection of our users&apos; financial and personal
          information.
        </p>
      </div>

      {/* ... resto del contenido ... */}

      <div className="mil-quote mil-p-160-130">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-xl-10">
              <h2 className="mil-mb-30">
                &quot;At Plax, transparency is not just a promise; It is the
                cornerstone of our relationship with you. We believe that trust
                is built with clear policies and coherent actions.&quot;
              </h2>
              <p className="mil-text-m mil-soft mil-mb-60">- Plax Team</p>

              {/* ... resto del contenido ... */}
            </div>
          </div>
        </div>
      </div>

      <CallToAction2 />
    </PlaxLayout>
  );
};

export default page;
