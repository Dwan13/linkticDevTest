import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CurrencyPipe } from '@angular/common';
import { Product } from '../../models/product'; // Asegúrate que la ruta al modelo Product sea correcta

@Component({
  selector: 'app-product-card',
  standalone: true,
  imports: [CurrencyPipe], // Para el pipe currency
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.sass']
})
export class ProductCardComponent {
  @Input() product!: Product; // Usamos "!" para indicar que será provisto por el padre
  @Output() addToCartClicked = new EventEmitter<Product>();

  onProductAddToCart(): void {
    this.addToCartClicked.emit(this.product);
  }
}
