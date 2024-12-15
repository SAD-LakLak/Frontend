export const phoneRules = [
    (value: string) =>
        !!value || "شماره تماس الزامی است",
    (value: string) =>
        /^[0-9]{11}$/.test(value) || "شماره تماس معتبر نیست",
];

export const passwordRules = [
    (value: string) => !!value || 'رمز عبور نباید خالی باشد',
    (value: string) =>
        value.length == 8 || 'رمز عبور باید 8 کاراکتر باشد',
];
export const nameRules = [
    (value: string) => !!value || 'نام شما نباید خالی باشد',
];

export const emailRules = [
    (value: string) => !!value || "ایمیل الزامی است",
    (value:string) =>  /.+@.+\..+/.test(value) || "فرمت ایمیل معتبر نیست"
];
