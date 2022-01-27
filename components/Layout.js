import { CartProvider } from '@/context/Store'
import Nav from '@/components/Nav'
import Footer from '@/components/Footer'

function Layout({ children }) {
  
  return (
    <CartProvider>
        <Nav />

        <main>
          {children}
        </main>

        <Footer />
    </CartProvider>
  )
}

export default Layout
