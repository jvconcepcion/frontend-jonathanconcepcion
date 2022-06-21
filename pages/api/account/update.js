export default async function updateUserHandler(req, res) {
  const UPDATE_USER_PATH = `${process.env.NEXT_PUBLIC_API_URL}${process.env.NEXT_PUBLIC_UPDATE_USER_PATH}`
  if(req.method === "PATCH") {
    let options = {
      method: "PATCH",
      headers: {
        'Content-Type': 'application/json',
        Authorization: req.headers.authorization
      },
      body: JSON.stringify(req.body)
    }

    const updateUserFetch = await fetch(UPDATE_USER_PATH, options)
    const data = await updateUserFetch.json()

    if(updateUserFetch.status === 200) {
      res.status(200).json(data)
    } else {
      res.status(updateUserFetch.status).json({ message: data.message })
    }
  }
}