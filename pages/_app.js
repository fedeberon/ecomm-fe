import Layout from '@/components/Layout'
import SEO from '@/components/SEO'
import '@/styles/globals.css'
import { Provider } from 'next-auth/client'

export default function MyApp({ Component, pageProps }) {

          return (
              <Provider session={pageProps.session} >
                  <Layout>
                    <SEO
                      title={process.env.siteTitle}
                    />
                          <Component {...pageProps} />
                  </Layout>

                </Provider>
          )
}
