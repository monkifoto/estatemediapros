export interface CartItem {
  basePrice: number;
  baseSqFt: number;
  description: string;
  id: string;
  imageUrl: string;
  incrementSqFtStep: number;
  isDetailsVisible: boolean;
  name: string;
  price: number;
  priceIncrementPerSqFt: number;
  productType: string;
}
