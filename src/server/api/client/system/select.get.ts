import type { IAuth } from "~~/types";

export default defineEventHandler(async (event) => {
  try {
    const auth = (await getAuth(event)) as IAuth;
    if (!auth) throw "Vui lòng đăng nhập trước";
    const system = await DB.System.find({ display: true }).select("name");
    return resp(event, { result: system });
  } catch (e: any) {
    return resp(event, { result: [] });
  }
});
