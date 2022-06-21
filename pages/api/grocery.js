export default async function groceryHandler(req, res) {
  const GROCERY_API_PATH = `${process.env.NEXT_PUBLIC_API_URL}${process.env.NEXT_PUBLIC_GROCERIES_PATH}`

  let options = {
    headers: {
      'Content-Type': 'application/json',
      Authorization: req.headers.authorization
    },
  }

  switch (req.method) {
    case 'GET':
      options.method = 'GET'

      const {body, ...getObj} = options
      const getGrocery = await fetch(GROCERY_API_PATH, getObj)
      const getData = await getGrocery.json()
      
      if(getGrocery.status === 200) {
        res.status(200).json(getData)
      } else {
        res.status(getGrocery.status).json({ message: getData.message })
      }
      break
    case 'PUT':
      options.method = 'PUT'
      options.body = JSON.stringify(req.body)
      const putGrocery = await fetch(GROCERY_API_PATH, options)
      const putData = await putGrocery.json()
      
      if(putGrocery.status === 200) {
        res.status(200).json(putData)
      } else {
        res.status(putGrocery.status).json({ message: putData.message })
      }
      break
    case 'PATCH':
      options.method = 'PATCH'
      options.body = JSON.stringify(req.body)
      const patchGrocery = await fetch(GROCERY_API_PATH, options)
      const patchData = await patchGrocery.json()
      
      if(patchGrocery.status === 200) {
        res.status(200).json(patchData)
      } else {
        res.status(patchGrocery.status).json({ message: patchData.message })
      }
      break
    case 'DELETE':
      options.method = 'DELETE'
      options.body = JSON.stringify(req.body)
      const deleteGrocery = await fetch(GROCERY_API_PATH, options)
      const deleteData = await deleteGrocery.json()
      
      if(deleteGrocery.status === 200) {
        res.status(200).json(deleteData)
      } else {
        res.status(deleteGrocery.status).json({ message: deleteData.message })
      }
      break
    default:
      break
  }
}