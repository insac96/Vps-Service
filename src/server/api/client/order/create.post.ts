export default defineEventHandler(async (event) => {
    try {
        const user = (await getAuth(event) as IAuth)
       if(!user) throw 'Vui lòng đăng nhập trước'

       const body = await readBody(event)
       const { key, gateId, option } = body
       if(!key || !gateId || !option) throw 'Dữ liệu đầu vào không hợp lệ'

        const gateSelect = await DB.Gate.findOne({ _id: gateId }).select('name number person type key qrcode callback display') as IDBGate
        if (!gateSelect) throw 'Kênh nạp không tồn tại'
        if (!gateSelect.display) throw 'Kênh nạp đang bảo trì'

       const product = await DB.Product.findOne({ key: key }).select('_id name') as IDBProduct
       if(!product) throw 'Sản phẩm không tồn tại'

        const hasOrder = await DB.Order.findOne({ product: product._id, user: user._id, status: 0 }).select('_id') as IDBOrder
        if (!!hasOrder) throw 'Đơn hàng cho mã nguồn này đã tồn tại, vui lòng thanh toán hoặc hủy đơn hàng và tạo lại'

       const order = await DB.Order.create({
        user: user._id,
        code: "ORDER-" + Math.random().toString(36).substring(2, 7).toUpperCase(),
        product: product._id,
        gate: gateId,
        number: option.number,
        money: parseInt(String(option.price)) ,
        status: 0
       })
        return resp(event, { message: 'Tạo giao dịch thành công', result: order })
    }
    catch (e: any) {
        return resp(event, { code: 500, message: e.toString() })
    }
})