export default defineEventHandler(async (event) => {
  try {
    const auth = (await getAuth(event)) as IAuth;
    if (!auth) throw "Vui lòng đăng nhập trước";

    const { _id, name, tax_code, address, email } = await readBody(event);
    if (!_id || !name || !tax_code || !address || !email) throw "Vui lòng nhập đủ thông tin";

    await DB.UserTax.findOneAndUpdate(
      { _id: _id },
      {
        name: name.toString(),
        tax_code: tax_code.toString(),
        address: address.toString(),
        email: email.toString(),
      }
    );
    return resp(event, { result: true, message: "Cập nhật thành công" });
  } catch (error) {
    return resp(event, { code: 401, message: error.toString() });
  }
});
