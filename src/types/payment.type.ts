export interface IPayment {
  _id: string;
  email: string;
  transactionId: string;
  price: number;
  createdAt?: Date;
}
