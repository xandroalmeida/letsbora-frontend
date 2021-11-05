import Document, { Html, Head, Main, NextScript } from 'next/document';

export default class MyDocument extends Document {
   static getInitialProps({ renderPage }) {
      // Returns an object like: { html, head, errorHtml, chunks, styles }     
      return renderPage();
   }

   render() {
      return (
         <Html>
            <Head>
               {/* Google Tag Manager */}
               <script
                  dangerouslySetInnerHTML={{
                     __html: `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
                           new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
                           j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
                           'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
                           })(window,document,'script','dataLayer','GTM-W48T2PR');`,
                  }}
               />
               {/* End Google Tag Manager */}
               {/* Google Tag Manager (noscript) */}
               <noscript
                  dangerouslySetInnerHTML={{
                     __html: `<iframe src="https://www.googletagmanager.com/ns.html?id=GTM-W48T2PR" height="0" width="0" style="display:none;visibility:hidden"></iframe>`,
                  }}
               />
               {/* End Google Tag Manager (noscript) */}

               <meta name="facebook-domain-verification" content="63lo8aa0i31x1t742ie5sx49pbhkjt" />

               <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no" />
               <meta httpEquiv="content-type" content="text/html; charset=UTF-8" />

               <link rel="preconnect" href="https://fonts.gstatic.com" />
               <link href="https://fonts.googleapis.com/css2?family=Open+Sans:wght@300;400;700&display=swap" rel="stylesheet" />
               {/* FAVICON */}
               <link rel="icon" type="image/x-icon" href="/assets/imgs/favicon/favicon-16x16.png" />
               <link rel="apple-touch-icon" sizes="57x57" href="/assets/imgs/favicon/apple-icon-57x57.png" />
               <link rel="apple-touch-icon" sizes="60x60" href="/assets/imgs/favicon/apple-icon-60x60.png" />
               <link rel="apple-touch-icon" sizes="72x72" href="/assets/imgs/favicon/apple-icon-72x72.png" />
               <link rel="apple-touch-icon" sizes="76x76" href="/assets/imgs/favicon/apple-icon-76x76.png" />
               <link rel="apple-touch-icon" sizes="114x114" href="/assets/imgs/favicon/apple-icon-114x114.png" />
               <link rel="apple-touch-icon" sizes="120x120" href="/assets/imgs/favicon/apple-icon-120x120.png" />
               <link rel="apple-touch-icon" sizes="144x144" href="/assets/imgs/favicon/apple-icon-144x144.png" />
               <link rel="apple-touch-icon" sizes="152x152" href="/assets/imgs/favicon/apple-icon-152x152.png" />
               <link rel="apple-touch-icon" sizes="180x180" href="/assets/imgs/favicon/apple-icon-180x180.png" />
               <link rel="icon" type="image/png" sizes="192x192"  href="/assets/imgs/favicon/android-icon-192x192.png" />
               <link rel="icon" type="image/png" sizes="32x32" href="/assets/imgs/favicon/favicon-32x32.png" />
               <link rel="icon" type="image/png" sizes="96x96" href="/assets/imgs/favicon/favicon-96x96.png" />
               <link rel="icon" type="image/png" sizes="16x16" href="/assets/imgs/favicon/favicon-16x16.png" />
               <link rel="manifest" href="/assets/imgs/favicon/manifest.json" />
               <meta name="msapplication-TileColor" content="#ffffff" />
               <meta name="msapplication-TileImage" content="/assets/imgs/favicon/ms-icon-144x144.png" />
               <meta name="theme-color" content="#ffffff"></meta>

               {/*FONT AWESOME*/}
               <link href={`/assets/vendors/all.min.css`} rel="stylesheet" />
            </Head>
            <body>
               <Main />
               <NextScript />

               <script src="https://smtpjs.com/v3/smtp.js"></script>
               {/* <script src="//code-sa1.jivosite.com/widget/ZW8UPy0cCF" async></script> */}
            </body>
         </Html>
      )
   }
}