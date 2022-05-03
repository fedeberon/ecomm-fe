import Layout from '@/components/Layout'
import SEO from '@/components/SEO'
import '@/styles/globals.css'
import { Provider } from 'next-auth/client'
import NextNProgress from "nextjs-progressbar";

export default function MyApp({ Component, pageProps }) {



          return (
              <Provider session={pageProps.session} >
                  <Layout>
                      <SEO title={process.env.siteTitle}/>
                      <NextNProgress />
                      <Component {...pageProps} />
                  </Layout>

                </Provider>
          )
}
