import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.sass']
})
export class HomeComponent {
  // Puedes agregar propiedades o métodos aquí si necesitas lógica en el futuro
  appName = 'Linktic Fast Food';
  welcomeMessage = '¡Bienvenido a nuestra aplicación de catálogo de productos!';
}