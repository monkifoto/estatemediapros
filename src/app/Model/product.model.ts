export interface Product {
  id: string;
  name: string;
  description: string;
  imageUrl: string;
  baseSqFt: number;
  basePrice: number;
  priceIncrementPerSqFt: number; // Price increase per 1000 sq ft
  incrementSqFtStep: number;     // Sq Ft step for each price increment (1000 in this case)
  price: number;
  productType: string;
}
