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

  return data
}

export async function updateGrocery(body) {

  let { accessToken } = await newAccessToken()

  let options = {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Token ${accessToken}`
    },
    body: JSON.stringify(body)
  }

  const res = await fetch('/api/grocery', options)
  const data = await res.json()

  return data
}

// PUT
export async function registerUser(body) {

  let copyBody = body

  copyBody.permissionLevel = 2

  let options = {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(copyBody)
  }

  const res = await fetch('/api/account/register', options)
  // const data = await res.json()

  if(res.status === 200) {
    alert('User Created!')
  } else {
    alert('Account already exists')
  }
}

export async function addProduct(body) {

  let { accessToken } = await newAccessToken()

  let options = {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Token ${accessToken}`
    },
    body: JSON.stringify(body)
  }

  const res = await fetch('/api/grocery', options)
  const data = await res.json()

  return data
}

// DELETE
export async function deleteProduct(body) {

  let { accessToken } = await newAccessToken()

  let options = {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Token ${accessToken}`
    },
    body: JSON.stringify(body)
  }

  const res = await fetch('/api/grocery', options)

  // const data = await res.json()

  if(res.status === 200) {
    window.location.reload()
  } else {
    alert('Error!')
  }
}