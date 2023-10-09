import Head from 'next/head'

function SEO({ title }) {
  // customize meta properties
  // you can pass them as an argument like title in case you want to change for each page
  const description = process.env.siteDescription
  const keywords = process.env.siteKeywords
  const siteURL = process.env.siteUrl
  const twitterHandle = process.env.twitterHandle
  const imagePreview = `${siteURL}/${process.env.siteImagePreviewUrl}`

  return (
    <Head>
      <meta charSet="utf-8" />
      <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" key="twcard" />
      <meta name="twitter:creator" content={twitterHandle} key="twhandle" />

      {/* Open Graph */}
      
      <meta property="og:url" content={siteURL} key="ogurl" />
      <meta property="og:image" content={imagePreview} key="ogimage" />
      <meta property="og:site_name" content={siteURL} key="ogsitename" />
      <meta property="og:title" content={title} key="ogtitle" />
      <meta property="og:description" content={description} key="ogdesc" />
      <title>{title}</title>

      <link rel="manifest" href="manifest.json" />
      <link
        href="/icons/favicon-16x16.png"
        rel="icon"
        type="image/png"
        sizes="16x16"
        purpose="any maskable"
      />
      <link
        href="/icons/favicon-32x32.png"
        rel="icon"
        type="image/png"
        sizes="32x32"
        purpose="any maskable"

      />
      <link rel="apple-touch-icon" href="/apple-icon.png"></link>
      <meta name="theme-color" content="#EF4444" />
      <link rel="apple-touch-icon" sizes="57x57" href="/apple-icon-57x57.png"></link>
      <link rel="apple-touch-icon" sizes="60x60" href="/apple-icon-60x60.png"></link>
      <link rel="apple-touch-icon" sizes="72x72" href="/apple-icon-72x72.png"></link>
      <link rel="apple-touch-icon" sizes="76x76" href="/apple-icon-76x76.png"></link>
      <link rel="apple-touch-icon" sizes="114x114" href="/apple-icon-114x114.png"></link>
      <link rel="apple-touch-icon" sizes="120x120" href="/apple-icon-120x120.png"></link>
      <link rel="apple-touch-icon" sizes="144x144" href="/apple-icon-144x144.png"></link>
      <link rel="apple-touch-icon" sizes="152x152" href="/apple-icon-152x152.png"></link>
      <link rel="apple-touch-icon" sizes="180x180" href="/apple-icon-180x180.png"></link>
      <link rel="icon" type="image/png" sizes="192x192"  href="/android-icon-192x192.png"></link>
      <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png"></link>
      <link rel="icon" type="image/png" sizes="96x96" href="/favicon-96x96.png"></link>
      <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png"></link>
      <link rel="manifest" href="/manifest.json"></link>
      <meta name="msapplication-TileColor" content="#ffffff"></meta>
      <meta name="msapplication-TileImage" content="/ms-icon-144x144.png"></meta>
      <meta name="theme-color" content="#ffffff"></meta>
      <link rel="manifest" href="/site.webmanifest"></link>
      <link rel="mask-icon" href="/safari-pinned-tab.svg" color="#5bbad5"></link>
      <meta name="msapplication-TileColor" content="#da532c"></meta>
      <meta name="theme-color" content="#ffffff"></meta>
    </Head>
  )
}

export default SEO
