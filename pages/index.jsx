import Head from 'next/head'
import Navbar from '../components/Navbar.jsx'
import Home from '../components/Home.jsx'
import Footer from '../components/Footer.jsx'

export default function IndexPage() {
  return (
    <div>
      <Head>
        <title>Collablit</title>
      </Head>
      <Navbar />
      <Home />
      <Footer />
    </div>
  )
}
