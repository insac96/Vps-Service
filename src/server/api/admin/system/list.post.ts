import type { IAuth } from "~~/types"

export default defineEventHandler(async (event) => {
  try {
    const auth = await getAuth(event) as IAuth
    if(auth.type !== 100) throw new Error('Bạn không phải quản trị viên')

    const { size, current, sort } = await readBody(event)
    if(!size || !current) throw new Error('Dữ liệu phân trang sai')
    if(!sort.column || !sort.direction) throw new Error('Dữ liệu sắp xếp sai')

    const sorting: Record<string, number> = {}
    sorting[sort.column] = sort.direction === 'desc' ? -1 : 1

    const list = await DB.System
      .aggregate([
        {
          $project: {
            name: 1,
            display: 1,
            updatedAt: 1,
            createdAt: 1,
          }
        },
        { $sort: sorting },
        { $skip: (current - 1) * size },
        { $limit: size }
      ])

    const total = await DB.System.countDocuments()

    return resp(event, { result: { list, total } })
  } catch (e: unknown) {
    return resp(event, { code: 500, message: e instanceof Error ? e.message : 'Unknown error' })
  }
})
