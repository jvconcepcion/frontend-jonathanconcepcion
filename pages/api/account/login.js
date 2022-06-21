export default async function loginHandler(req, res) {
  const LOGIN_API_PATH = `${process.env.NEXT_PUBLIC_API_URL}${process.env.NEXT_PUBLIC_LOGIN_PATH}`
  if(req.method === 'POST') {
    const loginFetch = await fetch(LOGIN_API_PATH, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(req.body)
    })
    const data = await loginFetch.json()

    res.status(200).json(data)
  }
}
