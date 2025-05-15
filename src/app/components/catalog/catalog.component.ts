import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
// CurrencyPipe ya no es necesario aquí si no se usa directamente en su template
import { Product } from '../../models/product';
import { ProductCardComponent } from '../product-card/product-card.component'; // Importa el nuevo componente
import { ProductService } from '../../services/product.service';
import { SharingDataService } from '../../services/sharing-data.service';
import { Observable, BehaviorSubject, combineLatest } from 'rxjs'; // Importar BehaviorSubject y combineLatest
import { map, distinctUntilChanged } from 'rxjs/operators'; // Importar operador map y distinctUntilChanged

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

  // Propiedades para el filtro por categoría
  private selectedCategorySubject = new BehaviorSubject<string | null>(null);
  selectedCategory$ = this.selectedCategorySubject.asObservable().pipe(distinctUntilChanged()); // Observable para la categoría seleccionada
  categories: string[] = []; // Lista de categorías disponibles

  constructor(
    private productService: ProductService,
    private sharingDataService: SharingDataService) { }

  ngOnInit(): void {
      // Iniciar la carga de productos en el servicio
      this.productService.loadProducts();

      // Combinar los observables de productos, página actual y categoría seleccionada
      this.paginatedProducts$ = combineLatest([
        this.productService.products$,
        this.currentPage$,
        this.selectedCategory$ // Añadir el observable de categoría seleccionada
      ]).pipe(
        map(([products, currentPage, selectedCategory]) => {
          // Filtrar productos por categoría si hay una seleccionada
          const filteredProducts = selectedCategory
            ? products.filter(product => product.category === selectedCategory)
            : products;

          // Extraer categorías únicas si es la primera vez que se cargan los productos
          if (this.categories.length === 0 && products.length > 0) {
             this.categories = ['Todas', ...new Set(products.map(p => p.category))];
          }


          // Calcular el total de productos filtrados y páginas
          this.totalProducts = filteredProducts.length;
          this.totalPages = Math.ceil(this.totalProducts / this.itemsPerPage);

          // Asegurarse de que la página actual no exceda el total de páginas después del filtrado
          if (currentPage > this.totalPages && this.totalPages > 0) {
              this.currentPageSubject.next(this.totalPages);
              currentPage = this.totalPages; // Usar la página ajustada para el slice
          } else if (this.totalPages === 0) {
              this.currentPageSubject.next(1); // Reset a página 1 si no hay productos
              currentPage = 1;
          }


          // Calcular el índice de inicio y fin para la paginación
          const startIndex = (currentPage - 1) * this.itemsPerPage;
          const endIndex = startIndex + this.itemsPerPage;

          // Devolver solo los productos de la página actual
          return filteredProducts.slice(startIndex, endIndex);
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

  // Método para manejar el cambio de categoría
  onCategoryChange(event: Event): void {
      const selectElement = event.target as HTMLSelectElement;
      const category = selectElement ? selectElement.value : null;
      this.selectedCategorySubject.next(category === 'Todas' ? null : category);
      this.currentPageSubject.next(1); // Reset a la primera página al cambiar de categoría
  }


  onProductSelected(product: Product): void {
    this.sharingDataService.productEventEmitter.emit(product);
  }
}
