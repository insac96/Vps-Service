import type { IAuth } from "~~/types"
import logAdmin from "../../../../utils/logAdmin"

export default defineEventHandler(async (event) => {
  try {
    const auth = await getAuth(event) as IAuth
    if(auth.type !== 100) throw 'Bạn không phải quản trị viên'

    const { product, content } = await readBody(event)
    if(!product || !content) throw 'Dữ liệu đầu vào không đủ'

    const option = await DB.ProductOption.findOne({ product: product }).select('number price')
    if(!option) throw 'Sản phẩm không tồn tại'

    await DB.ProductOption.updateOne({ 
        product: product 
    },{ 
      content: content, 
      updater: auth._id 
    })

    logAdmin(event, `Sửa nội dung sản phẩm <b>${option.title}</b>`)

    return resp(event, { message: 'Cập nhật nội dung thành công' })
  } 
  catch (e:any) {
    return resp(event, { code: 400, message: e.toString() })
  }
})