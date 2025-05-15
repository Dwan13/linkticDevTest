import { Component, EventEmitter, Input, Output, SimpleChanges } from '@angular/core';
import { CartItem } from '../../models/cartItem';
import { CurrencyPipe } from '@angular/common'; // Ya no es necesario aquí si no se usa directamente en su template
import { SharingDataService } from '../../services/sharing-data.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cart',
  imports: [CurrencyPipe],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.sass'
})
export class CartComponent {
 
  items: CartItem[] = [];

  total = 0;
    
  constructor(private sharingDataService: SharingDataService, private router: Router) {
    this.items = this.router.getCurrentNavigation()?.extras.state!['items'];
    this.total = this.router.getCurrentNavigation()?.extras.state!['total'];
  }

  onDeleteCart(id: number) {
    this.sharingDataService.idProductEventEmitter.emit(id);
  }
}
