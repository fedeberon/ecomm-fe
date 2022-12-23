import { CartProvider } from '@/context/Store'
import Nav from '@/components/Nav'
import Footer from '@/components/Footer'

function Layout({ children }) {
  
  return (
    <CartProvider>
      <div className='sticky top-0 z-40 shadow'>
        <Nav />
      </div>

        <main>
          {children}
        </main>

        <Footer />
    </CartProvider>
  )
}

export default Layout
