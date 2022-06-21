import React, {useEffect, useState, useRef} from 'react'
import { useRouter } from 'next/router'
import { setCookies, checkCookies  } from 'cookies-next'
import { handleKeepLogin } from '../../../helpers/utils'
import Head from 'next/head'
import ModalComponent from '../../../components/Modal'
import AccountForm from '../../../components/Form/AccountForm'
import styles from '../../../styles/account/login/LoginForm.module.scss'
import Slider from "react-slick"

const LoginForm = () => {

  const router = useRouter()
  const passwordField = useRef(null)
  const stayLoginCheckbox = useRef(null)
  const [loginData, setLoginData] = useState({
    email: "",
    password: ""
  })
  const [showSignUp, setShowSignUp] = useState(false)
  const LOGIN_API_PATH = `${process.env.NEXT_PUBLIC_API_URL}${process.env.NEXT_PUBLIC_LOGIN_PATH}`

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
    adaptiveHeight: true
  }

  const fetchWithCache = async (url) => {
    
    const res = await fetch('/api/account/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(loginData)
    })
    const data = await res.json()

    if(res?.status === 200) {
      handleKeepLogin(url, data.userId)
      setCookies(url, data)
      router.push('/', undefined, {shallow: true})
      alert("Success")
    } else {
      alert("The username or password you have entered is invalid.")
    }
  }

  useEffect(() => {

    if(stayLoginCheckbox.current.checked) {
      setCookies('StayLogin', true)
    } else {
      setCookies('StayLogin', false)
    }

    const stayLoginState = checkCookies("StayLogin")
    const loginState = checkCookies(LOGIN_API_PATH)

    if(stayLoginState && loginState && loginState.userId) {
      router.push('/')
    }

  }, [])

  return (
    <div className={styles.grid}>
      <Head>
        <title>Sign in</title>
        <meta name="description" content="Technical Exam" />
        <meta httpEquiv="Content-Security-Policy" content="upgrade-insecure-requests" />
      </Head>
      <div className={styles.loginContainer}>
        <h1 className={styles.loginHeader}>
          Login
        </h1>
        <p className={styles.subLoginHeader}>Sign in with your data that you entered during your registration.</p>
        <div className={styles.loginFields}>
          <div className={styles.loginFields_email}>
            <span>Email</span>
            <input 
              type='email' 
              placeholder='name@example.com' 
              onChange={(e) => setLoginData(data => ({...data, email: e.target.value}))}
            />
          </div>
          <div className={styles.loginFields_pass}>
            <span>Password</span>
            <input
              ref={passwordField}
              type='password'
              placeholder='min. 8 characters'
              onChange={(e) => setLoginData(data => ({ ...data, password: e.target.value }))}
            />
            <a>
              <span>
                <img src="/image/show-password/Outer.png"/>
                <img 
                  onClick={() => passwordField.current.type === "password" ? 
                    passwordField.current.type = "text"
                  : passwordField.current.type = "password"} 
                  className={styles.innerEye} 
                  src="/image/show-password/Inner.png"
                />
              </span>
              
            </a>
          </div>
        </div>
        <div className={styles.keepLogin}>
          <input ref={stayLoginCheckbox} type='checkbox' onClick={(e) => setCookies("StayLogin", e.target.checked)}/>
          <span>Keep me logged in</span>
        </div>
        <div className={styles.btnLinkWrapper}>
          <span
            className={loginData.email === "" || loginData.password === "" ? styles.btnDisable : ""} >
            <button 
              onClick={() => fetchWithCache(LOGIN_API_PATH)}>
                Login
            </button>
          </span>
          <a>Forgot password</a>
          <div className={styles.btnLinkWrapper_signUp}>
            <span>Don’t have an account? <a onClick={() => setShowSignUp(true)}>Sign up</a></span>
          </div>
        </div>
        <ModalComponent
          size='lg' 
          title='Sign up'
          show={showSignUp} 
          handleClose={() => setShowSignUp(false)} 
        >
          <AccountForm type="Signup" />
        </ModalComponent>
      </div>
      <div className={styles.carouselContainer}>
      <Slider {...settings}>
          <div>
            <h3>1</h3>
          </div>
          <div>
            <h3>2</h3>
          </div>
          <div>
            <h3>3</h3>
          </div>
          <div>
            <h3>4</h3>
          </div>
        </Slider>
      </div>
     
    </div>
  )
}

export default LoginForm