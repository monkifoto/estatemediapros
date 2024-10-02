import { Pipe, PipeTransform } from '@angular/core';
import { Product } from 'src/app/Model/product.model';

@Pipe({
  name: 'sortBy'
})
export class SortByPipe implements PipeTransform {

  transform(products: Product[], sortField: string = 'sort', ascending: boolean = true): Product[] {
    if (!products || products.length === 0) return products;

    return products.sort((a, b) => {
      const aValue = a[sortField as keyof Product] ?? 0;
      const bValue = b[sortField as keyof Product] ?? 0;

      if (aValue > bValue) {
        return ascending ? 1 : -1;
      } else if (aValue < bValue) {
        return ascending ? -1 : 1;
      } else {
        return 0;
      }
    });
  }
}
