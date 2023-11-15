import Layout from '@/components/Layout'
import SEO from '@/components/SEO'
import '@/styles/globals.css'
import { SessionProvider } from "next-auth/react"
import NextNProgress from "nextjs-progressbar";

export default function MyApp({ Component, pageProps }) {



          return (
              <SessionProvider session={pageProps.session} >
                  <Layout>
                      <SEO title={process.env.siteTitle}/>
                      <NextNProgress />
                      <Component {...pageProps} />
                  </Layout>

                </SessionProvider>
          )
}
