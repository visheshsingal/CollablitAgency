import '../styles/globals.css'
import AdminSidebar from '../components/AdminSidebar.jsx'

export default function MyApp({ Component, pageProps }) {
  return (
    <>
      <AdminSidebar />
      <Component {...pageProps} />
    </>
  )
}
