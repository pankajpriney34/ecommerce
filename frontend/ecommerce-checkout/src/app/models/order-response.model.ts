export interface OrderResponse {
  orderId: string;
  status: 'approved' | 'declined' | 'error';
  success: boolean;
}