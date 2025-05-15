import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CartItem } from '../../models/cartItem'; // Asegúrate que la ruta a cartItem.ts o cart-item.ts sea correcta
import { CommonModule } from '@angular/common'; // Necesario para [class.show] y otras directivas comunes
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-navbar',
  standalone: true, 
  imports: [RouterModule], 
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.sass'
})
export class NavbarComponent {
  @Input() items: CartItem[] = [];
  @Input() total: number = 0;  
}
