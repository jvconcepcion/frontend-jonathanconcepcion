import { setCookies, getCookie, checkCookies  } from 'cookies-next';

const LOGIN_API_PATH = `${process.env.NEXT_PUBLIC_API_URL}${process.env.NEXT_PUBLIC_LOGIN_PATH}`
const REFRESH_TOKEN_PATH = `${process.env.NEXT_PUBLIC_API_URL}${process.env.NEXT_PUBLIC_REFRESH_TOKEN_PATH}`

// POST
export async function newAccessToken(url) {

  let newLoginState =  JSON.parse(getCookie(LOGIN_API_PATH))

  let options = {
    method: "POST",
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ token: newLoginState.refreshToken})
  }
 
  const res = await fetch(url, options)
  
  const data = await res.json()

  if (newLoginState) {
    newLoginState.accessToken = data.accessToken
    setCookies(LOGIN_API_PATH, newLoginState)
  }

  return data
}

// GET
export async function baseCall(
  url, 
  refreshToken, 
  withQueryParams = false, 
  queryParams) {

  let { accessToken } = await newAccessToken(REFRESH_TOKEN_PATH)

  let options = {
    method: "GET",
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Token ${accessToken}`
    },
  }

  const res = await fetch(`${url}${withQueryParams ? `?${queryParams}` : ''}`, options)
  const data = await res.json()

  return data
}