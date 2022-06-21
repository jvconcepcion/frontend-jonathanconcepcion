import { useEffect } from 'react'
import { useRouter } from 'next/router'
import '../styles/globals.scss'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'

function MyApp({ Component, pageProps }) {

  const router = useRouter()
  const LOGIN_API_PATH = `${process.env.NEXT_PUBLIC_API_URL}${process.env.NEXT_PUBLIC_LOGIN_PATH}`

  useEffect(() => {
    if (!localStorage.getItem(LOGIN_API_PATH) && !sessionStorage.getItem(LOGIN_API_PATH)) {
      router.push('/account/login')
    }
  }, [])

  return <Component {...pageProps} />
}

export default MyApp
