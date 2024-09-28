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
      description: 'High-quality HDR photography for real estate listings.',
      imageUrl: '../../assets/productImages/EssentialPhotos.jpg',
      baseSqFt: 1000,
      basePrice: 150,
      priceIncrementPerSqFt: 50, // $50 for each additional 1000 sq ft
      incrementSqFtStep: 1000, // Increment step size
      price: 0,
      productType:'photo',
      isDetailsVisible: false
    },
    {
      id: '002',
      name: 'Showcase',
      description: 'High-quality HDR blend with Professional lighting photography for real estate listings.',
      imageUrl: '../../assets/productImages/ShowcasePhotos.jpg',
      baseSqFt: 1000,
      basePrice: 230,
      priceIncrementPerSqFt: 60, // $50 for each additional 1000 sq ft
      incrementSqFtStep: 1000, // Increment step size
      price: 0,
      productType:'photo',
      isDetailsVisible: false
    },
    {
      id: '003',
      name: 'Aerial Add On',
      description: 'High-quality drone photography',
      imageUrl: '../../assets/productImages/AerialPhotos.jpg',
      baseSqFt: 1000,
      basePrice: 120,
      priceIncrementPerSqFt: 0, // $50 for each additional 1000 sq ft
      incrementSqFtStep: 1000, // Increment step size
      price: 0,
      productType:'photo',
      isDetailsVisible: false
    },
    {
      id: '004',
      name: 'Virtual Twilight',
      description: '3 High quality photos converted from Day to Twilight.',
      imageUrl: '../../assets/productImages/VirtualTwilight.jpg',
      baseSqFt: 1000,
      basePrice: 120,
      priceIncrementPerSqFt: 0, // $50 for each additional 1000 sq ft
      incrementSqFtStep: 1000, // Increment step size
      price: 0,
      productType:'photo',
      isDetailsVisible: false
    },
    {
      id: '004',
      name: 'Done Video Add-On',
      description: 'Professional video tour for real estate.',
      imageUrl: '../../assets/productImages/AerialPhotos.jpg',
      baseSqFt: 1000,
      basePrice: 200,
      priceIncrementPerSqFt: 100, // $100 for each additional 1000 sq ft
      incrementSqFtStep: 1000, // Increment step size
      price: 0,
       productType:'video',
       isDetailsVisible: false
    },
    {
      id: '005',
      name: 'Standard Video Tour',
      description: 'Professional video tour for real estate.',
        imageUrl: 'https://via.placeholder.com/200x400',
      baseSqFt: 1000,
      basePrice: 200,
      priceIncrementPerSqFt: 100, // $100 for each additional 1000 sq ft
      incrementSqFtStep: 1000, // Increment step size
      price: 0,
       productType:'video',
       isDetailsVisible: false
    },
    {
      id: '006',
      name: 'Video Reel Tour',
      description: 'Professional video tour for real estate.',
        imageUrl: 'https://via.placeholder.com/200x400',
      baseSqFt: 1000,
      basePrice: 200,
      priceIncrementPerSqFt: 100, // $100 for each additional 1000 sq ft
      incrementSqFtStep: 1000, // Increment step size
      price: 0,
       productType:'video',
       isDetailsVisible: false
    },
    {
      id: '007',
      name: 'Slideshow  Tour',
      description: 'Professional video tour for real estate.',
        imageUrl: 'https://via.placeholder.com/200x400',
      baseSqFt: 1000,
      basePrice: 200,
      priceIncrementPerSqFt: 100, // $100 for each additional 1000 sq ft
      incrementSqFtStep: 1000, // Increment step size
      price: 0,
       productType:'video',
       isDetailsVisible: false
    },
    {
      id: '008',
      name: '3D Tour',
      description: 'High-quality Matterport Tour for real estate listings.',
      imageUrl: 'https://via.placeholder.com/200x400',
      baseSqFt: 1000,
      basePrice: 150,
      priceIncrementPerSqFt: 50, // $50 for each additional 1000 sq ft
      incrementSqFtStep: 1000, // Increment step size
      price: 0,
       productType:'tour',
       isDetailsVisible: false
    },
    {
      id: '009',
      name: 'Zillo Tour',
      description: 'High-quality Matterport Tour for real estate listings.',
      imageUrl: 'https://via.placeholder.com/200x400',
      baseSqFt: 1000,
      basePrice: 150,
      priceIncrementPerSqFt: 50, // $50 for each additional 1000 sq ft
      incrementSqFtStep: 1000, // Increment step size
      price: 0,
       productType:'tour',
       isDetailsVisible: false
    },
    {
      id: '010',
      name: 'Floor Plans',
      description: 'High-quality Floor Plan real estate listings.',
      imageUrl: '../../assets/productImages/FloorPlan.jpg',
      baseSqFt: 1000,
      basePrice: 70,
      priceIncrementPerSqFt: 10, // $50 for each additional 1000 sq ft
      incrementSqFtStep: 1000, // Increment step size
      price: 0,
       productType:'floorplan',
       isDetailsVisible: false
    },
    {
      id: '011',
      name: 'Virtual Staging',
      description: 'High-quality Floor Plan real estate listings.',
      imageUrl: '../../assets/productImages/VirtualStaging.jpg',
      baseSqFt: 1000,
      basePrice: 35,
      priceIncrementPerSqFt: 10, // $50 for each additional 1000 sq ft
      incrementSqFtStep: 1000, // Increment step size
      price: 0,
      productType:'staging',
      isDetailsVisible: false
    },
    {
      id: '012',
      name: 'Virtual Decluter',
      description: 'High-quality Floor Plan real estate listings.',
      imageUrl: '../../assets/productImages/VirtualDecluter.jpg',
      baseSqFt: 1000,
      basePrice: 40,
      priceIncrementPerSqFt: 10, // $50 for each additional 1000 sq ft
      incrementSqFtStep: 1000, // Increment step size
      price: 0,
      productType:'staging',
      isDetailsVisible: false
    },
    // {
    //   id: '012',
    //   name: 'Staging Company',
    //   description: 'High-quality Floor Plan real estate listings.',
    //   imageUrl: 'https://via.placeholder.com/200x400',
    //   baseSqFt: 1000,
    //   basePrice: 3500,
    //   priceIncrementPerSqFt: 10, // $50 for each additional 1000 sq ft
    //   incrementSqFtStep: 1000, // Increment step size
    //   price: 0,
    //   productType:'staging',
    //   isDetailsVisible: false
    // },
    {
      id: '013',
      name: 'Essentials Bundle',
      description: 'High-quality HDR photos, Aerial and Floor plan.',
      imageUrl: '../../assets/productImages/MultiBundle2.jpg',
      baseSqFt: 1000,
      basePrice: 200,
      priceIncrementPerSqFt: 10, // $50 for each additional 1000 sq ft
      incrementSqFtStep: 1000, // Increment step size
      price: 0,
      productType:'bundle',
      isDetailsVisible: false
    },
    {
      id: '014',
      name: 'Showcase Bundle',
      description: 'High-quality photos with professional lighting, and a floor plan with aproximate dimmentions.',
      imageUrl: '../../assets/productImages/MultiBundle.jpg',
      baseSqFt: 1000,
      basePrice: 250,
      priceIncrementPerSqFt: 30, // $50 for each additional 1000 sq ft
      incrementSqFtStep: 1000, // Increment step size
      price: 0,
      productType:'bundle',
      isDetailsVisible: false
    },
    {
      id: '015',
      name: 'Luxurious Bundle',
      description: 'High-quality photos with professional lighting, Aerial Photo and Video, Walkthrouh Video, 3D Matterport and Floor Plan.',
      imageUrl: '../../assets/productImages/MultiBundle.jpg',
      baseSqFt: 1000,
      basePrice: 250,
      priceIncrementPerSqFt: 30, // $50 for each additional 1000 sq ft
      incrementSqFtStep: 1000, // Increment step size
      price: 0,
      productType:'bundle',
      isDetailsVisible: false
    },
    // {
    //   id: '015',
    //   name: 'Total Bundle',
    //   description: 'High-quality Floor Plan real estate listings.',
    //   imageUrl: 'https://via.placeholder.com/200x400',
    //   baseSqFt: 1000,
    //   basePrice: 3500,
    //   priceIncrementPerSqFt: 10, // $50 for each additional 1000 sq ft
    //   incrementSqFtStep: 1000, // Increment step size
    //   price: 0,
    //   productType:'bundle',
    //   isDetailsVisible: false
    // },
    // Add other products as needed
  ];

  constructor() {}

  getProducts(){
    return this.products;
  }

  getProductById(id: string): Product | undefined {
    return this.products.find(product => product.id === id);
  }

  getProductByType(type: string): Product[] {
    return this.products.filter(product => product.productType === type);
  }

}
