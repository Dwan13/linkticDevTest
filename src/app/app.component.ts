import { Component } from '@angular/core';
import { CartAppComponent } from './components/cart-app/cart-app.component';
import { FooterComponent } from './components/footer/footer.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CartAppComponent, FooterComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.sass'
})
export class AppComponent {
  title = 'linkticProject';
}
