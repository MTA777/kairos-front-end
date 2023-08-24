export const stringNumFormat = (value, min, max) => {
  return Number(value).toLocaleString(undefined, {
    minimumFractionDigits: min,
    maximumFractionDigits: max,
  });
};
