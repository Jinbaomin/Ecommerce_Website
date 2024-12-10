export const convertCurrency = (price: number | undefined): string => {
  return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}

export const convertFullNameShorten = (fullName: string) => {
  const arr = fullName.split(' ');
  return arr[0] + ' ' + arr[arr.length - 1];
}

export const extractFirstWordOfName = (name: string) => {
  const arr = name.split(' ');
  return arr[0][0] + arr[arr.length - 1][0];
}