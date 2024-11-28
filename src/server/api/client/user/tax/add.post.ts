export default defineEventHandler(async (event) => {
  try {
    const auth = (await getAuth(event)) as IAuth;
    if (!auth) throw "Vui lòng đăng nhập trước";

    const { name, tax_code, address, email } = await readBody(event);
    if (!name || !tax_code || !address || !email) throw "Vui lòng nhập đủ thông tin";

    await DB.UserTax.create({
      name: name.toString(),
      tax_code: tax_code.toString(),
      address: address.toString(),
      email: email.toString(),
      user: auth._id,
    });

    return resp(event, { result: true, message: "Thêm thành công" });
  } catch (error) {
    return resp(event, { code: 401, message: error.toString() });
  }
});
