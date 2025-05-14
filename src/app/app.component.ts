import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CartAppComponent } from './components/cart-app/cart-app.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, CartAppComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.sass'
})
export class AppComponent {
  title = 'linkticProject';
}
