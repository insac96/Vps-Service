import type { IAuth } from "~~/types";
import logAdmin from "../../../utils/logAdmin";

export default defineEventHandler(async (event) => {
  try {
    const auth = (await getAuth(event)) as IAuth;
    if (auth.type !== 100) throw "Bạn không phải quản trị viên";

    const body = await readBody(event);
    const { category, name, description, images, og_image } = body;

    if (!category || !name || !description || !og_image)
      throw "Dữ liệu đầu vào không hợp lệ";
    if (!Array.isArray(images)) throw "Dữ liệu hình ảnh không hợp lệ";

    const categoryCheck = await DB.Category.findOne({ _id: category }).select(
      "_id name"
    );
    if (!categoryCheck) throw "Danh mục không tồn tại";

    const key = formatVNString(event, name, "-");
    const check = await DB.Product.findOne({ key: key }).select("_id");
    if (!!check) throw "Tên sản phẩm đã tồn tại";
    body.key = key;
    await DB.Product.create(body);
    logAdmin(event, `Thêm sản phẩm <b>${name}</b>`);

    return resp(event, { message: "Thêm sản phẩm thành công" });
  } catch (e: any) {
    return resp(event, { code: 400, message: e.toString() });
  }
});
