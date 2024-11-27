import type { IAuth } from "~~/types"
import logAdmin from "../../../utils/logAdmin"
import formatVNString from "../../../utils/formatVNString"

export default defineEventHandler(async (event) => {
  try {
    const auth = await getAuth(event) as IAuth
    if(auth.type !== 100) throw 'Bạn không phải quản trị viên'

    const body = await readBody(event)
    const { name, color , image } = body
    if(!name || !color || !image) throw 'Dữ liệu đầu vào không hợp lệ'
    
    const key = formatVNString(event, name, '-')

    const getByName = await DB.Category.findOne({ key: key }).select('_id')
    if(!!getByName) throw 'Tên danh mục đã tồn tại'

    body.key = key
    body.color = color.value
    await DB.Category.create(body)
    logAdmin(event, `Thêm danh mục sản phẩm <b>${name}</b>`)
    
    return resp(event, { message: 'Thêm danh mục thành công' })
  } 
  catch (e:any) {
    return resp(event, { code: 400, message: e.toString() })
  }
})