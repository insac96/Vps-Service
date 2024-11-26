export default defineEventHandler(async (event) => {
    try {
      const { key } = await readBody(event)

      const gateData = await DB.Gate.findOne({ _id: key }).select('-key -qrcode -createdAt -updatedAt')
      if(!gateData) throw 'Kênh này không tồn tại'
      return resp(event, { result: gateData })
    } 
    catch (e:any) {
      return resp(event, { result: [] })
    }
  })