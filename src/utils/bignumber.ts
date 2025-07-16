import { BigNumber } from 'bignumber.js';
BigNumber.config({ ROUNDING_MODE: 6 });

function formatNumber(value: string, decimal = 0, maxDigits = 20) {
  // const result = Number(
  //   new BigNumber(value).div(10 ** decimal).toString(),
  // ).toLocaleString(undefined, {
  //   maximumFractionDigits: maxDigits,
  // });
  // console.log(value);
  const n = Number(new BigNumber(value).div(10 ** decimal).toFixed());
  // const digitN = Math.floor(n * 10 ** maxDigits) / 10 ** maxDigits;
  const digitN = new BigNumber(n)
    .times(10 ** maxDigits)
    .div(10 ** maxDigits)
    .toFixed();

  const parts = digitN.toString().split('.');
  parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  const result = parts.join('.');
  return result;
}

export default { formatNumber };
