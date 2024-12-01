export default defineEventHandler(async (event) => {
  try {
    const auth = (await getAuth(event)) as IDBUser
    if(auth.type !== 100) throw 'Bạn không phải quản trị viên'
    const { _id, info } = await readBody(event)
    if (!_id || !info) throw 'Dữ liệu đầu vào không hợp lệ'
    if (!Array.isArray(info) || info.length < 1) throw 'Thông tin vps không hợp lệ'

    for (const item of info) {
      if (!item.ip || !item.password) throw 'Dữ liệu đầu vào không hợp lệ'
      if (!/^((\d{1,3}\.){3}\d{1,3}|[0-9a-fA-F:]+)$/.test(item.ip)) throw 'Địa chỉ IP không hợp lệ'
    }
    const service = await DB.Service.findOne({ _id: _id })

    if(!service) throw 'Danh sách không tìm thấy'
    if(service.status !== 1 ) throw 'VPS này chưa kích hoạt'

    service.info = info
    await service.save()
    return resp(event, { message: 'Thao tác thành công' })
  } catch (error) {
    return resp(event, { code: 400, message: error.toString() })
  }
})
