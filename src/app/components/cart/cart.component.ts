import { Component, EventEmitter, Input, Output, SimpleChanges } from '@angular/core';
import { CartItem } from '../../models/cartItem';
import { CurrencyPipe } from '@angular/common'; // Ya no es necesario aquí si no se usa directamente en su template
import { SharingDataService } from '../../services/sharing-data.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CurrencyPipe], // Asegúrate de tener CommonModule y CurrencyPipe si los usas
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.sass'] // Asegúrate de que esta línea apunte al archivo SASS
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
