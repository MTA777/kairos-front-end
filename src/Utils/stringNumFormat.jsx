export const stringNumFormat = (value, min, max) => {
  return Number(value).toLocaleString(undefined, {
    //Num or ParseFloat to convert to number, use "en-US" in place of undefined
    minimumFractionDigits: min,
    maximumFractionDigits: max,
  });
};
