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

export function sumObjValuesBy(data, key) {
  return data
    .map(item => item[key])
    .reduce((a, b) => {
      return a + b
    }, 0)
}

export function orderComputation(total) {
  const VAT = .12
  let tax = total * VAT,
      netAmount = total + tax

  return netAmount

}