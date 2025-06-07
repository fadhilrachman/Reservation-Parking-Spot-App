interface FLoorCustomerType {
  id: string;
  name: string;
  space: SpaceCustomerType[];
  created_at: Date;
}

interface SpaceCustomerType {
  id: string;
  name: string;
  created_at: Date;
  transaction: TransactionCustomerType[];
}
interface ReservationType {
  time_start: Date;
  time_end: Date;
  space_id: string;
  price: number;
}

interface TransactionCustomerType {
  id: string;
  status: string;
  time_start: Date;
  price: number;
  time_end: Date;
}

export type {
  FLoorCustomerType,
  TransactionCustomerType,
  SpaceCustomerType,
  ReservationType,
};
