import { getCookie, removeCookies } from 'cookies-next'

export function handleKeepLogin(url, data) {
  if(!getCookie('StayLogin')) {
    sessionStorage.setItem(url, JSON.stringify(data))
    if(localStorage.getItem(url)) localStorage.removeItem(url)
  } else {
    localStorage.setItem(url, JSON.stringify(data))
    if(sessionStorage.getItem(url)) sessionStorage.removeItem(url)
  }
}

export function removeSession(url) {
  if(sessionStorage.getItem(url)) sessionStorage.removeItem(url)
  if(localStorage.getItem(url)) localStorage.removeItem(url)
  removeCookies(url)
}