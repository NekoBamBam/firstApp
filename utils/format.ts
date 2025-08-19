// utils/format.ts
export const uid = () => `${Date.now()}-${Math.random().toString(16).slice(2)}`;

export const formatCurrency = (amount: number) => {
  return `$ ${amount.toFixed(2)}`;
};

export const isSameDay = (date1: Date, date2: Date) => {
  return (
    date1.getFullYear() === date2.getFullYear() &&
    date1.getMonth() === date2.getMonth() &&
    date1.getDate() === date2.getDate()
  );
};

export const isSameMonth = (date1: Date, date2: Date) => {
  return (
    date1.getFullYear() === date2.getFullYear() &&
    date1.getMonth() === date2.getMonth()
  );
};
