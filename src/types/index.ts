export type CategoryId = 'kho' | 'giavi' | 'douong' | 'thocam';

export interface Category {
  id: CategoryId;
  name: string;
  desc: string;
  color: string;
  tint: string;
  iconName: string;
}

export interface Product {
  id: number;
  name: string;
  category: CategoryId;
  origin: string;
  price: number;
  unit: string;
  icon: string;
  desc: string;
  tasteProfile?: string;
  preservation?: string;
  badge?: 'Bán chạy' | 'Mới' | 'Đặc sắc';
  stock?: number;
}

export interface Coupon {
  code: string;
  type: 'percent' | 'fixed';
  value: number;
  desc: string;
  minOrder: number;
  maxDiscount?: number;
}

export interface CartItem {
  productId: number;
  qty: number;
}

export interface OrderItem {
  id: number;
  name: string;
  qty: number;
  price: number;
  unit: string;
  icon: string;
  category: CategoryId;
}

export interface CustomerInfo {
  name: string;
  phone: string;
  address: string;
  note?: string;
}

export type PaymentMethod = 'cod' | 'bank' | 'card';

export interface Order {
  id: string;
  date: number;
  items: OrderItem[];
  subtotal: number;
  discount: number;
  total: number;
  coupon: string | null;
  pay: PaymentMethod;
  statusIndex: number; // 1: Đã đặt hàng, 2: Đã xác nhận, 3: Đang đóng gói, 4: Đang vận chuyển, 5: Đã giao hàng
  trackingUpdatedAt: number;
  customerInfo: CustomerInfo;
  isRefundRequested?: boolean;
  refundRequestedAt?: number;
}

export interface UserProfile {
  name: string;
  phone: string;
  email: string;
  address: string;
}
