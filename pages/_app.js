import Layout from '@/components/Layout'
import SEO from '@/components/SEO'
import '@/styles/globals.css'
import { Provider } from 'next-auth/client'
import NextNProgress from "nextjs-progressbar";
import { useRouter } from 'next/router'

export default function MyApp({ Component, pageProps }) {
          const router = useRouter();


          return (
              <Provider session={pageProps.session} >
                  <Layout>
                      <SEO title={process.env.siteTitle}/>
                      <NextNProgress />
                      <div key={router.asPath} className="page-transition">
                        <Component {...pageProps} />
                      </div>
                  </Layout>

                </Provider>
          )
}
