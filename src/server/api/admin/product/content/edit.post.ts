import type { IAuth } from "~~/types"
import logAdmin from "../../../../utils/logAdmin"

export default defineEventHandler(async (event) => {
  try {
    const auth = await getAuth(event) as IAuth
    if(auth.type !== 100) throw 'Bạn không phải quản trị viên'

    const { _id, content } = await readBody(event)
    if(!_id || !content) throw 'Dữ liệu đầu vào không đủ'

    const product = await DB.Product.findOne({ _id: _id }).select('title')
    if(!product) throw 'Sản phẩm không tồn tại'

    await DB.Product.updateOne({ 
      _id: _id 
    },{ 
      content: content, 
      updater: auth._id 
    })

    logAdmin(event, `Sửa nội dung sản phẩm <b>${product.title}</b>`)

    return resp(event, { message: 'Cập nhật nội dung thành công' })
  } 
  catch (e:any) {
    return resp(event, { code: 400, message: e.toString() })
  }
})