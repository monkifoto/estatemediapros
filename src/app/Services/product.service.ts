import { Injectable } from '@angular/core';
import { Product } from '../Model/product.model';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  products: Product[] = [
    {
      id: '001',
      name: 'Essentials',
      description: 'High-quality basic photography for real estate listings.',
      imageUrl: 'https://via.placeholder.com/200x400',
      baseSqFt: 2000,
      basePrice: 150,
      priceIncrementPerSqFt: 50, // $50 for each additional 1000 sq ft
      incrementSqFtStep: 1000, // Increment step size
      price: 0,
      productType:'photo'
    },
    {
      id: '002',
      name: 'Showcase',
      description: 'High-quality basic photography for real estate listings.',
      imageUrl: 'https://via.placeholder.com/200x400',
      baseSqFt: 2000,
      basePrice: 150,
      priceIncrementPerSqFt: 50, // $50 for each additional 1000 sq ft
      incrementSqFtStep: 1000, // Increment step size
      price: 0,
      productType:'photo'
    },
    {
      id: '003',
      name: 'Aerial',
      description: 'High-quality basic photography for real estate listings.',
      imageUrl: 'https://via.placeholder.com/200x400',
      baseSqFt: 2000,
      basePrice: 150,
      priceIncrementPerSqFt: 50, // $50 for each additional 1000 sq ft
      incrementSqFtStep: 1000, // Increment step size
      price: 0,
      productType:'photo'
    },
    {
      id: '004',
      name: 'Done  Add-On',
      description: 'Professional video tour for real estate.',
      imageUrl: 'https://via.placeholder.com/200x400',
      baseSqFt: 2000,
      basePrice: 200,
      priceIncrementPerSqFt: 100, // $100 for each additional 1000 sq ft
      incrementSqFtStep: 1000, // Increment step size
      price: 0,
       productType:'video'
    },
    {
      id: '005',
      name: 'Standard  Tour',
      description: 'Professional video tour for real estate.',
        imageUrl: 'https://via.placeholder.com/200x400',
      baseSqFt: 2000,
      basePrice: 200,
      priceIncrementPerSqFt: 100, // $100 for each additional 1000 sq ft
      incrementSqFtStep: 1000, // Increment step size
      price: 0,
       productType:'video'
    },
    {
      id: '006',
      name: 'Reel  Tour',
      description: 'Professional video tour for real estate.',
        imageUrl: 'https://via.placeholder.com/200x400',
      baseSqFt: 2000,
      basePrice: 200,
      priceIncrementPerSqFt: 100, // $100 for each additional 1000 sq ft
      incrementSqFtStep: 1000, // Increment step size
      price: 0,
       productType:'video'
    },
    {
      id: '007',
      name: 'Slideshow  Tour',
      description: 'Professional video tour for real estate.',
        imageUrl: 'https://via.placeholder.com/200x400',
      baseSqFt: 2000,
      basePrice: 200,
      priceIncrementPerSqFt: 100, // $100 for each additional 1000 sq ft
      incrementSqFtStep: 1000, // Increment step size
      price: 0,
       productType:'video'
    },
    {
      id: '008',
      name: '3D Tour',
      description: 'High-quality Matterport Tour for real estate listings.',
      imageUrl: 'https://via.placeholder.com/200x400',
      baseSqFt: 2000,
      basePrice: 150,
      priceIncrementPerSqFt: 50, // $50 for each additional 1000 sq ft
      incrementSqFtStep: 1000, // Increment step size
      price: 0,
       productType:'tour'
    },
    {
      id: '009',
      name: 'Zillo Tour',
      description: 'High-quality Matterport Tour for real estate listings.',
      imageUrl: 'https://via.placeholder.com/200x400',
      baseSqFt: 2000,
      basePrice: 150,
      priceIncrementPerSqFt: 50, // $50 for each additional 1000 sq ft
      incrementSqFtStep: 1000, // Increment step size
      price: 0,
       productType:'tour'
    },
    {
      id: '010',
      name: 'Floor Plans',
      description: 'High-quality Floor Plan real estate listings.',
      imageUrl: 'https://via.placeholder.com/200x400',
      baseSqFt: 2000,
      basePrice: 70,
      priceIncrementPerSqFt: 10, // $50 for each additional 1000 sq ft
      incrementSqFtStep: 1000, // Increment step size
      price: 0,
       productType:'floorplan'
    },
    {
      id: '011',
      name: 'Virtual Staging',
      description: 'High-quality Floor Plan real estate listings.',
      imageUrl: 'https://via.placeholder.com/200x400',
      baseSqFt: 2000,
      basePrice: 35,
      priceIncrementPerSqFt: 10, // $50 for each additional 1000 sq ft
      incrementSqFtStep: 1000, // Increment step size
      price: 0,
      productType:'staging'
    },
    {
      id: '012',
      name: 'Staging Company',
      description: 'High-quality Floor Plan real estate listings.',
      imageUrl: 'https://via.placeholder.com/200x400',
      baseSqFt: 2000,
      basePrice: 3500,
      priceIncrementPerSqFt: 10, // $50 for each additional 1000 sq ft
      incrementSqFtStep: 1000, // Increment step size
      price: 0,
      productType:'staging'
    },
    {
      id: '013',
      name: 'Basic Bundle',
      description: 'High-quality Floor Plan real estate listings.',
      imageUrl: 'https://via.placeholder.com/200x400',
      baseSqFt: 2000,
      basePrice: 3500,
      priceIncrementPerSqFt: 10, // $50 for each additional 1000 sq ft
      incrementSqFtStep: 1000, // Increment step size
      price: 0,
      productType:'bundle'
    },
    {
      id: '014',
      name: 'Advanced Bundle',
      description: 'High-quality Floor Plan real estate listings.',
      imageUrl: 'https://via.placeholder.com/200x400',
      baseSqFt: 2000,
      basePrice: 3500,
      priceIncrementPerSqFt: 10, // $50 for each additional 1000 sq ft
      incrementSqFtStep: 1000, // Increment step size
      price: 0,
      productType:'bundle'
    },
    {
      id: '015',
      name: 'Total Bundle',
      description: 'High-quality Floor Plan real estate listings.',
      imageUrl: 'https://via.placeholder.com/200x400',
      baseSqFt: 2000,
      basePrice: 3500,
      priceIncrementPerSqFt: 10, // $50 for each additional 1000 sq ft
      incrementSqFtStep: 1000, // Increment step size
      price: 0,
      productType:'bundle'
    },
    // Add other products as needed
  ];

  constructor() {}

  getProducts(){
    return this.products;
  }

  getProductById(id: string) {
    return this.products.find(product => product.id === id);
  }

  getProductByType(type: string): Product[] {
    return this.products.filter(product => product.productType === type);
  }

}
