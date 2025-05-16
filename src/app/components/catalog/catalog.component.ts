import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Product } from '../../models/product';
import { ProductCardComponent } from '../product-card/product-card.component';
import { ProductService } from '../../services/product.service';
import { SharingDataService } from '../../services/sharing-data.service';
import { Observable, BehaviorSubject, combineLatest } from 'rxjs';
import { map, distinctUntilChanged } from 'rxjs/operators';

@Component({
  selector: 'app-catalog',
  standalone: true,
  imports: [ProductCardComponent, CommonModule],
  templateUrl: './catalog.component.html',
  styleUrls: ['./catalog.component.sass']
})
export class CatalogComponent implements OnInit {
  paginatedProducts$!: Observable<Product[]>;

  private currentPageSubject = new BehaviorSubject<number>(1);
  currentPage$ = this.currentPageSubject.asObservable();
  itemsPerPage = 8;
  totalProducts = 0;
  totalPages = 0;

  private selectedCategorySubject = new BehaviorSubject<string | null>(null);
  selectedCategory$ = this.selectedCategorySubject.asObservable().pipe(distinctUntilChanged());
  categories: string[] = [];

  constructor(
    private productService: ProductService,
    private sharingDataService: SharingDataService
  ) {}

  ngOnInit(): void {
    console.log('CatalogComponent inicializado');
    this.productService.loadProducts();

    this.paginatedProducts$ = combineLatest([
      this.productService.products$,
      this.currentPage$,
      this.selectedCategory$
    ]).pipe(
      map(([products, currentPage, selectedCategory]) => {
        console.log('Productos recibidos:', products);

        const filteredProducts = selectedCategory
          ? products.filter(product => product.category === selectedCategory)
          : products;

        if (this.categories.length === 0 && products.length > 0) {
          this.categories = ['Todas', ...Array.from(new Set(products.map(p => p.category)))];
        }

        this.totalProducts = filteredProducts.length;
        this.totalPages = Math.ceil(this.totalProducts / this.itemsPerPage);

        if (currentPage > this.totalPages && this.totalPages > 0) {
          this.currentPageSubject.next(this.totalPages);
          currentPage = this.totalPages;
        } else if (this.totalPages === 0) {
          this.currentPageSubject.next(1);
          currentPage = 1;
        }

        const startIndex = (currentPage - 1) * this.itemsPerPage;
        const endIndex = startIndex + this.itemsPerPage;

        return filteredProducts.slice(startIndex, endIndex);
      })
    );
  }

  previousPage(): void {
    const currentPage = this.currentPageSubject.value;
    if (currentPage > 1) {
      this.currentPageSubject.next(currentPage - 1);
    }
  }

  nextPage(): void {
    const currentPage = this.currentPageSubject.value;
    if (currentPage < this.totalPages) {
      this.currentPageSubject.next(currentPage + 1);
    }
  }

  onCategoryChange(event: Event): void {
    const selectElement = event.target as HTMLSelectElement;
    const category = selectElement ? selectElement.value : null;
    this.selectedCategorySubject.next(category === 'Todas' ? null : category);
    this.currentPageSubject.next(1);
  }

  onProductSelected(product: Product): void {
    this.sharingDataService.productEventEmitter.emit(product);
  }
}
