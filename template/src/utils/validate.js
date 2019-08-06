/**
 * 校验正整数
 */
export const validateNumber = (num) => {
    let exp = /^[1-9][0-9]+$/i;
    return exp.test('' + num);
}