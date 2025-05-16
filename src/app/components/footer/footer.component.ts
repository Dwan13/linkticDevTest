import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.sass'] // O .css si usas CSS plano
})
export class FooterComponent {
  currentYear = new Date().getFullYear();
}