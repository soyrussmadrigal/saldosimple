import Script from "next/script";

const TrackingScripts = () => {
  return (
    <>
      {/* Google Search Console */}
      <meta
        name="google-site-verification"
        content="KjyvG0WYzqfk5IAek3iIDGNe_I46IAygf6P4AvxFTUY"
      />

      {/* Google Tag Manager (head) */}
      <Script id="gtm-head" strategy="afterInteractive">
        {`
          (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
          new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
          j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
          'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
          })(window,document,'script','dataLayer','GTM-N3DDLRQ4');
        `}
      </Script>

      {/* Google Tag Manager (noscript - en el body si querés usarlo) */}
      {/* Agregalo manualmente en _document.js si necesitás el <noscript> */}
    </>
  );
};

export default TrackingScripts;
