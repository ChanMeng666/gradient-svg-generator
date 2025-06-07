import { Html, Head, Main, NextScript } from 'next/document'

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        <meta charSet="utf-8" />
        <meta name="description" content="A professional gradient SVG generator to create beautiful animated gradient banners for your projects, GitHub README, design works - completely free and easy to use" />
        <meta name="keywords" content="gradient, SVG, generator, banner, animated, GitHub, README" />
        <meta name="author" content="Chan Meng" />
        
        {/* Favicon */}
        <link rel="icon" type="image/svg+xml" href="/gradient-svg-generator.svg" />
        <link rel="alternate icon" href="/gradient-svg-generator.svg" />
        
        {/* Apple Touch Icon */}
        <link rel="apple-touch-icon" href="/gradient-svg-generator.svg" />
        
        {/* Manifest */}
        <meta name="theme-color" content="#000000" />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  )
} 