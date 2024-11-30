import type { IAuth } from "~~/types"

export default defineEventHandler(async (event) => {
  try {
    const auth = await getAuth(event) as IAuth
    if(!auth) throw 'Vui lòng đăng nhập trước'
    const { size, current, sort, search, user, range } = await readBody(event)
    if(!size || !current || !search) throw 'Dữ liệu phân trang sai'
    if(!sort.column || !sort.direction) throw 'Dữ liệu sắp xếp sai'

    let userCheck
    if((auth as IAuth).type < 1){
      userCheck = auth._id
    }
    else {
      userCheck = !!user ? user : auth._id
    }

    const sorting : any = { }
    sorting[sort.column] = sort.direction == 'desc' ? -1 : 1

    const match : any = { user: userCheck }
    if(search.key && search.by){
      match['$text'] = { '$search': search.key }
    }
    if(!!range && !!range['start'] && !!range['end']){
      match['createdAt'] = { $gte: new Date(range['start']), $lte: new Date(range['end']) }
    }

    const list = await DB.Order
    .find(match)
    .select('gate user code money status note end_time createdAt')
    .populate({ path: 'gate', select: 'name' })
    .sort(sorting)
    .limit(size)
    .skip((current - 1) * size)

    const total = await DB.Order.countDocuments(match)
    return resp(event, { result: { list, total } })
  } 
  catch (e:any) {
    return resp(event, { code: 400, message: e.toString() })
  }
})