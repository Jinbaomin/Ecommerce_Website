export const convertCurrency = (price: number | undefined): string => {
  return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}