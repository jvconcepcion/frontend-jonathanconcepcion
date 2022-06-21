export default async function registerHandler (req, res) {
  const REGISTER_API_PATH = `${process.env.NEXT_PUBLIC_API_URL}${process.env.NEXT_PUBLIC_REGISTER_PATH}`
  if(req.method === 'PUT') {
    let options = {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(req.body)
    }

    const registerFetch = await fetch(REGISTER_API_PATH, options)
    const data = await registerFetch.json()

    if(registerFetch.status === 200) {
      res.status(200).json(data)
    } else {
      res.status(registerFetch.status).json({ message: data.message})
    }
  }
}