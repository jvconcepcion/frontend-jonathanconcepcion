const REFRESH_TOKEN_PATH = `${process.env.NEXT_PUBLIC_API_URL}${process.env.NEXT_PUBLIC_REFRESH_TOKEN_PATH}`

export default async function tokenHandler(req, res) {
  if(req.method === 'POST') {
    const tokenFetch = await fetch(REFRESH_TOKEN_PATH, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(req.body)
    })
    const data = await tokenFetch.json()

    if(tokenFetch.status === 200) {
      res.status(200).json(data)
    } else {
      res.status(tokenFetch.status).json({ message: data.message })
    }
  }
}