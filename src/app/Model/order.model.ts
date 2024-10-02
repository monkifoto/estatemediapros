import { CartItem } from "./cart-item.model";
import { CustomerInfo } from "./customer-info.model";

export interface Order {
  cartContents: CartItem[];
  customerInfo: CustomerInfo;
  comments: string;
  tourLink: string;
  videoLink: string;

}
