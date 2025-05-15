import { Component, Input, Output, EventEmitter } from '@angular/core';
// CurrencyPipe ya no es necesario aquí si no se usa directamente en su template
import { Product } from '../../models/product';
import { ProductCardComponent } from '../product-card/product-card.component'; // Importa el nuevo componente
import { ProductService } from '../../services/product.service';
import { SharingDataService } from '../../services/sharing-data.service';

@Component({
  selector: 'app-catalog',
  standalone: true,
  imports: [ProductCardComponent], // Agrega ProductCardComponent, CurrencyPipe ya no es necesario aquí
  templateUrl: './catalog.component.html',
  styleUrls: ['./catalog.component.sass']
})
export class CatalogComponent {
  
  products!: Product[];

  constructor(
    private productService: ProductService,
    private sharingDataService: SharingDataService) { }
  
  ngOnInit(): void {
      this.products = this.productService.findAll();
  }

  
  onProductSelected(product: Product): void {
    this.sharingDataService.productEventEmitter.emit(product);
  }
}
