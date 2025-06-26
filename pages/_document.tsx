import { Html, Head, Main, NextScript } from 'next/document'

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        {/* Google Fonts */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link
          href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@700&family=Inter:wght@400;500;600&family=Fira+Code:wght@400&display=swap"
          rel="stylesheet"
        />
        
        {/* Favicon */}
        <link rel="icon" href="/favicon.ico" />
        
        {/* Meta tags */}
        <meta charSet="utf-8" />
        <meta name="theme-color" content="#0A0A10" />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  )
} 