import { IDBConfig } from "~~/types"

export default defineEventHandler(async (event) => {
  try {
    const config = await DB.Config.findOne().select(`name description image.og`) as IDBConfig
    if(!config) throw 'Không tìm thấy cấu hình trang'
    const user = 0
    const game = 0
    const order = 0
    console.log(config);
    
    return resp(event, { result: { config, user, game, order } })
  } 
  catch (e:any) {
    return resp(event, { code: 400, message: e.toString() })
  }
})