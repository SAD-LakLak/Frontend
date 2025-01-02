export const phoneRules = [
  (value: string) => !!value || "شماره تماس الزامی است",
  (value: string) => /^[0-9]{11}$/.test(value) || "شماره تماس معتبر نیست",
];

export const passwordRules = [
  (value: string) => !!value || "نباید خالی باشد",
  (value: string) => value.length == 8 || "باید 8 کاراکتر باشد",
];
export const nameRules = [
  (value: string) => !!value || "نباید خالی باشد",
];

export const emailRules = [
  (value: string) => !!value || "این فیلد الزامی است",
  (value: string) => /.+@.+\..+/.test(value) || "فرمت ایمیل معتبر نیست",
];
