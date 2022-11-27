export interface CreateOrder {
  products: { product: string; quantity: number }[];
  address: string;
  paymentMethod: number;
  userId: string;
}
