import type { IAuth } from "~~/types"
import logAdmin from "../../../utils/logAdmin"

export default defineEventHandler(async (event) => {
  try {
    const auth = await getAuth(event) as IAuth
    if(auth.type !== 100) throw new Error('Bạn không phải quản trị viên')

    const body = await readBody(event)
    const { name } = body
    if(!name) throw 'Dữ liệu đầu vào không hợp lệ'


    const getByName = await DB.System.findOne({ name: name }).select('_id')
    if(!!getByName) throw 'Tên danh mục đã tồn tại'

    await DB.System.create(body)
    logAdmin(event, `Thêm hệ thống <b>${name}</b>`)
    
    return resp(event, { message: 'Thêm thành công' })
  } 
  catch (e:any) {
    return resp(event, { code: 400, message: e.toString() })
  }
})