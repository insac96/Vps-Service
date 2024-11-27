
export default defineEventHandler(async (event) => {
  try {
    // Props
    const match : any = { display: true, createdAt: { $lt: new Date() } }
    const sorting : any = { pin: -1 }
    const list = await DB.Product.find(match).limit(8).sort(sorting).populate({ path: 'category', select: 'name key color' })
    return resp(event, { result: { list } })
  } 
  catch (e:any) {
    return resp(event, { code: 500, message: e.toString() })
  }
})

