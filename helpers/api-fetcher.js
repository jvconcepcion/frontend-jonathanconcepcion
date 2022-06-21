import { setCookies, getCookie  } from 'cookies-next';

const LOGIN_API_PATH = `${process.env.NEXT_PUBLIC_API_URL}${process.env.NEXT_PUBLIC_LOGIN_PATH}`

// POST
async function newAccessToken() {

  let newLoginState =  JSON.parse(getCookie(LOGIN_API_PATH))

  let options = {
    method: "POST",
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ token: newLoginState.refreshToken})
  }
 
  const res = await fetch('/api/account/token', options)
  
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
  withQueryParams = false, 
  queryParams) {

  let { accessToken } = await newAccessToken()

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

// PATCH
export async function updateUser(body) {

  let { accessToken } = await newAccessToken()

  let options = {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Token ${accessToken}`
    },
    body: JSON.stringify(body)
  }

  const res = await fetch('/api/account/update', options)

  const data = await res.json()

  console.log(data)
}