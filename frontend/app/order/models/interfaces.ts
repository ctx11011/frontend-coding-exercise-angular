export interface Order {
  commissionRate: number;
  currentLocation: Location;
  customer: string;
  delayMinutes: number;
  deliveredAt: Date;
  deliveryLocation: Location;
  driverName: string;
  headcount: number;
  id: number;
  lastModified: Date;
  lateReason?: string;
  packaging: string;
  paymentType: Payment;
  price: Price;
  delivery: number; // boolean?
  items: number;
  total: number;
  vatAmount: number;
  vatRate: number;
  vatableItems: number;
  requestedDeliveryDate: Date;
  servingStyle: string; // enum?
  vendor: string;
  vendorLocation: Location;
}

export interface Location {
  lat: number;
  long: number;
}

export interface Price {
  delivery: number; // boolean?
  items: number;
  total: number;
  vatRate: number;
  vatableItems: number;
  vatAmount: number;
}

export enum Payment {
  CASH = 'Cash',
  CARD = 'Card',
  PAY_ON_ACCOUNT = 'Account'
}

export interface OrderResponse {
  count: number;
  items: Order[];
  page: number;
  pageSize: number;
  total: number;
}

export enum DataType {
  STRING = 'string',
  NUMBER = 'number',
  DATE = 'date'
}

export interface Column {
  field: string;
  label: string;
  class?: string;
  callback?: () => void;
  format?: (data: any) => string;
}

export enum SortDirection {
  ASC = 'asc',
  DESC = 'desc'
}

export interface Sorting {
  field: string;
  type: DataType;
  direction: SortDirection;
}
