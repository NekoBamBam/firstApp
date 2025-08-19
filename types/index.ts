export type Expense = {
  id: string;
  amount: number;        // en unidades de moneda (ej: 1234.56)
  description: string;
  category?: string;
  date: string;          // ISO string (ej: 2025-08-17T15:00:00.000Z)
  createdAt: string;     // para ordenar por creación
};
