import { Pipe, PipeTransform } from '@angular/core';
import { Product } from '../Model/product.model';

@Pipe({
  name: 'filterByType'
})
export class FilterByTypePipe implements PipeTransform {
  transform(products: Product[], type: string): Product[] {
    if (!products || !type) {
      return [];
    }
    return products.filter(product => product.productType === type);
  }
}
