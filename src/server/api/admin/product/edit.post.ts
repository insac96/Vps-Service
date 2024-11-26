import type { IAuth } from "~~/types"
import logAdmin from "../../../utils/logAdmin"

export default defineEventHandler(async (event) => {
  try {
    const auth = await getAuth(event) as IAuth
    if(auth.type !== 100) throw 'Bạn không phải quản trị viên'

    const body = await readBody(event)
    const { _id, category, name, description, images } = body
    if(!_id || !category || !name || !description ) throw 'Dữ liệu đầu vào không hợp lệ'
    if(!Array.isArray(images)) throw 'Dữ liệu hình ảnh không hợp lệ'

    const categoryCheck = await DB.Category.findOne({ _id: category }).select('_id name')
    if(!categoryCheck) throw 'Danh mục không tồn tại'

    const check = await DB.Product.findOne({ _id: _id }).select('name')
    if(!check) throw 'Sản phẩm không tồn tại'

    if(check.name != name){
      const key = formatVNString(event, name, '-')
      const getByname = await DB.Product.findOne({ key: key }).select('_id')
      if(!!getByname) throw 'Tên sản phẩm đã tồn tại'
      body.key = key
    }
    delete body['_id']

    await DB.Product.updateOne({ _id: _id }, body)
    logAdmin(event, `Sửa thông tin sản phẩm <b>${check.name}</b>`)

    return resp(event, { message: 'Sửa sản phẩm thành công' })
  } 
  catch (e:any) {
    return resp(event, { code: 400, message: e.toString() })
  }
})