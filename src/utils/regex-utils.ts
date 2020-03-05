export default {
  /**
   * 检验是否是手机号
   */
  isPhone(value: string): boolean {
    const reg = /^0?(13[0-9]|15[012356789]|17[013678]|18[0-9]|14[57])[0-9]{8}$/;
    return reg.test(value);
  },

  /**
   * 检验是否是邮箱
   */
  isEmail(value: string): boolean {
    const reg = /^[a-z0-9]+([._\\-]*[a-z0-9])*@([a-z0-9]+[-a-z0-9]*[a-z0-9]+.){1,63}[a-z0-9]+$/;
    return reg.test(value);
  },

  /**
   * 检验是否是数字
   */
  isNumber(value: string): boolean {
    const reg = /^[0-9]+.?[0-9]*/;
    return reg.test(value);
  },

  /**
   * 检验是否是省
   * @param value
   */
  isProvince(value: string): boolean {
    const reg = /^\d{2}[0]{4}/;
    return reg.test(value);
  },

  /**
   * 检验是否是省
   * @param value
   */
  isCity(value: string): boolean {
    const reg = /^\d{4}[0]{2}/;
    return reg.test(value);
  },

  /* 校验是否包含数字 */
  containNumbers(param: string): boolean {
    const reg = /\d/;
    return reg.test(param);
  },
};
