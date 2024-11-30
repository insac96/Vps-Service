export default defineEventHandler(async (event) => {
  try {
    const user = (await getAuth(event)) as IDBUser
    if (!user) throw 'Vui lòng đăng nhập trước'

    const { _id } = await readBody(event)
    if (!_id) throw 'Dữ liệu đầu vào không hợp lệ'

    const list = await DB.OrderDetail.find({ order: _id }).populate({ path: 'product', select: 'name' }).populate({ path: 'os', select: 'name' })
    return resp(event, { result: list })
  } catch (error) {
    return resp(event, { code: 500, message: error.toString() })
  }
})
