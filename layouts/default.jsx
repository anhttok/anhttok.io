import Header from '@/layouts/components/Header'
import Footer from '@/layouts/components/Footer'

const DefaultLayout = ({ children }) => {
  return (
    <div id="main-container">
      <Header />
      {children}
      <Footer />
    </div>
  )
}

export default DefaultLayout