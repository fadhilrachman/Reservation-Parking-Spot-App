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
}

export type { FLoorCustomerType, SpaceCustomerType };
