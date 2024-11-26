import type { IAuth } from "~~/types"

export default defineEventHandler(async (event) => {
  try {
    const auth = await getAuth(event) as IAuth
     if(auth.type !== 100) throw 'Bạn không phải quản trị viên'
    const gates = await DB.Gate.find().select('name')
    return resp(event, { result: gates })
  } 
  catch (e:any) {
    return resp(event, { result: [] })
  }
})