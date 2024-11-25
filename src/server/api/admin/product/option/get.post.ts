import type { IAuth } from "~~/types"

export default defineEventHandler(async (event) => {
  try {
    const auth = await getAuth(event) as IAuth
    if(auth.type !== 100) throw 'Bạn không phải quản trị viên'

    const { _id } = await readBody(event)
    if(!_id) throw 'Dữ liệu đầu vào không đủ'

    const option = await DB.ProductOption.findOne({ product: _id }).select('number price') 

    if(!option) throw 'Tin tức không tồn tại'
    return resp(event, { result: option })
  } 
  catch (e:any) {
    return resp(event, { code: 400, message: e.toString() })
  }
})