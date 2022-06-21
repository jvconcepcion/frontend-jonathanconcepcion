export default async function groceryHandler(req, res) {
  const GROCERY_API_PATH = `${process.env.NEXT_PUBLIC_API_URL}${process.env.NEXT_PUBLIC_GROCERIES_PATH}`
  if(req.method === 'GET') {

    let options = {
      method: "GET",
      headers: {
        'Content-Type': 'application/json',
        Authorization: req.headers.authorization
      },
    }
  
    const groceryFetch = await fetch(GROCERY_API_PATH, options)
    const data = await groceryFetch.json()

    res.status(200).json(data)
  }
}