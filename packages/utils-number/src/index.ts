import BigNumber from "bignumber.js";

export const add = (number1: string, number2: string): string => {
  const n1 = new BigNumber(number1);
  const n2 = new BigNumber(number2);
  return n1.plus(n2).toString();
};
