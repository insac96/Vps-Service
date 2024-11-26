export default defineEventHandler(async (event) => {
  try {
    const { key } = await readBody(event)
    if(!key) throw 'Không tìm thấy khóa sản phẩm'

    const product = await DB.Product
    .findOneAndUpdate({ key: key, display: 1 }, { new: true })
    .populate({ path: 'category', select: 'name key' })

    if(!product) throw 'Sản phẩm không tồn tại'
    return resp(event, { result: product })
  } 
  catch (e:any) {
    return resp(event, { code: 500, message: e.toString() })
  }
})