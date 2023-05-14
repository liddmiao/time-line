/**
 * 生成uuid
 * @param len uuid长度
 * @param radix uuid进制
 * @returns uuid
 */
export const createUUID = (len = 16, radix = 10): string => {
  const chars = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz'.split('');
  const uuid: string[] = [];
  for (let i = 0; i < len; i++) {
    uuid[i] = chars[Math.floor(Math.random() * radix)];
  }
  return uuid.join('');
};
