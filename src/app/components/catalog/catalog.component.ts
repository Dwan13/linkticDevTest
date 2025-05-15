import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
// CurrencyPipe ya no es necesario aquí si no se usa directamente en su template
import { Product } from '../../models/product';
import { ProductCardComponent } from '../product-card/product-card.component'; // Importa el nuevo componente
import { ProductService } from '../../services/product.service';
import { SharingDataService } from '../../services/sharing-data.service';
import { Observable, BehaviorSubject, combineLatest } from 'rxjs'; // Importar BehaviorSubject y combineLatest
import { map } from 'rxjs/operators'; // Importar operador map

@Component({
  selector: 'app-catalog',
  standalone: true,
  imports: [ProductCardComponent, CommonModule], // Agregar CommonModule aquí
  templateUrl: './catalog.component.html',
  styleUrls: ['./catalog.component.sass']
})
export class CatalogComponent {

  // products ya no es un array directo, sino un Observable
  // products$!: Observable<Product[]>; // Ya no necesitamos esta propiedad directamente

  // Observable para los productos de la página actual
  paginatedProducts$!: Observable<Product[]>;

  // Propiedades para la paginación
  private currentPageSubject = new BehaviorSubject<number>(1);
  currentPage$ = this.currentPageSubject.asObservable();
  itemsPerPage = 8; // Número de productos por página
  totalProducts = 0; // Total de productos (para calcular el número total de páginas)
  totalPages = 0; // Número total de páginas

  constructor(
    private productService: ProductService,
    private sharingDataService: SharingDataService) { }

  ngOnInit(): void {
      // Iniciar la carga de productos en el servicio
      this.productService.loadProducts();

      // Combinar el observable de productos del servicio con el observable de la página actual
      this.paginatedProducts$ = combineLatest([
        this.productService.products$,
        this.currentPage$
      ]).pipe(
        map(([products, currentPage]) => {
          // Calcular el total de productos y páginas
          this.totalProducts = products.length;
          this.totalPages = Math.ceil(this.totalProducts / this.itemsPerPage);

          // Calcular el índice de inicio y fin para la paginación
          const startIndex = (currentPage - 1) * this.itemsPerPage;
          const endIndex = startIndex + this.itemsPerPage;

          // Devolver solo los productos de la página actual
          return products.slice(startIndex, endIndex);
        })
      );
  }

  // Método para ir a la página anterior
  previousPage(): void {
    const currentPage = this.currentPageSubject.value;
    if (currentPage > 1) {
      this.currentPageSubject.next(currentPage - 1);
    }
  }

  // Método para ir a la página siguiente
  nextPage(): void {
    const currentPage = this.currentPageSubject.value;
    if (currentPage < this.totalPages) {
      this.currentPageSubject.next(currentPage + 1);
    }
  }

  onProductSelected(product: Product): void {
    this.sharingDataService.productEventEmitter.emit(product);
  }
}
