import { CartItem } from "./cart-item.model";
import { Customer } from "./customer.model";

export interface Order {
  cartContents: CartItem[];
  customerInfo: Customer;
  comments: string;
  tourLink: string;
  videoLink: string;
  MLStourLink: string;
  MLSvideoLink: string;
  squareFootage: string;

}
