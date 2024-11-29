import type { IAuth } from "~~/types"
import logAdmin from "../../../utils/logAdmin"

export default defineEventHandler(async (event) => {
  try {
    const auth = await getAuth(event) as IAuth
    if(auth.type !== 100) throw 'Bạn không phải quản trị viên'

    const body = await readBody(event)
    const { _id, name } = body
    if(!_id || !name) throw 'Dữ liệu đầu vào không hợp lệ'

    const system = await DB.System.findOne({ _id: _id }).select('name')
    if(!system) throw 'Hệ thống không tồn tại'

    delete body['_id']
    await DB.System.updateOne({ _id: _id }, body)

    logAdmin(event, `Sửa thông tin hệ thống <b>${system.name}</b>`)
    return resp(event, { message: 'Sửa thành công' })
  } 
  catch (e:any) {
    return resp(event, { code: 400, message: e.toString() })
  }
})