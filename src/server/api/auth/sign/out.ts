import type { IAuth } from "~~/types"

export default defineEventHandler(async (event) => {
  try {
    const auth = await getAuth(event) as IAuth

    const runtimeConfig = useRuntimeConfig(event)
    deleteCookie(event, 'token-auth', runtimeConfig.public.COOKIE_CONFIG)
    return resp(event, { message: 'Đăng xuất thành công' })
  } 
  catch (e:any) {
    return resp(event, { code: 400, message: e.toString() })
  }
})