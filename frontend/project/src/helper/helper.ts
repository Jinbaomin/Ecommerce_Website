export const convertCurrency = (price: number): string => {
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

export const calculateDiscountPercentage = (price: number, discount: number): number => {
  return Math.round(((price - discount) / price) * 100);
}

export const plusDays = (dateString: string, days: number) => {
  // Convert the date string to a Date object
  const date = new Date(dateString.replace(' ', 'T'));

  // Add the specified number of days
  date.setDate(date.getDate() + days);

  // Format back to 'YYYY-MM-DD HH:mm:ss' string
  // const pad = num => String(num).padStart(2, '0');
  const formattedDate = `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;
  return formattedDate;
}