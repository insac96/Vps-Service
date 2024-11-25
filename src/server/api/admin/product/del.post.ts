import type { IAuth } from "~~/types"
import logAdmin from "../../../utils/logAdmin"

export default defineEventHandler(async (event) => {
  try {
    const auth = await getAuth(event) as IAuth
    if(auth.type !== 100) throw 'Bạn không phải quản trị viên'

    const { _id } = await readBody(event)
    if(!_id) throw 'Dữ liệu đầu vào không hợp lệ'

    const product = await DB.Product.findOne({ _id: _id }).select('name')
    if(!product) throw 'Sản phẩm không tồn tại'

    await DB.Product.deleteOne({ _id: _id })
    logAdmin(event, `Xóa sản phẩm <b>${product.name}</b>`)

    return resp(event, { message: 'Xóa sản phẩm thành công' })
  } 
  catch (e:any) {
    return resp(event, { code: 400, message: e.toString() })
  }
})