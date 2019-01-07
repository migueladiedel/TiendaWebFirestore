import {Product} from "./product";
export class Order {
  id: string;
  uid: string;
  products: Product[] = [];
  totalProducts: number = 0;
  amount: number;
  created_at: Date;
  constructor() {}
}