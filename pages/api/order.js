export default async function orderHandler(req, res) {
  const GET_ORDER_API_PATH = `${process.env.NEXT_PUBLIC_API_URL}${process.env.NEXT_PUBLIC_ORDER_PATH}`
  if(req.method === 'GET') {
    let options = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: req.headers.authorization
      },
    }

    const orderFetch = await fetch(GET_ORDER_API_PATH, options)
    const data = await orderFetch.json()

    if(orderFetch.status === 200) {
      res.status(200).json(data)
    } else {
      res.status(orderFetch.status).json({ message: data.message })
    }
  }
}