import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CatalogComponent } from './catalog.component';
import { ProductService } from '../../services/product.service';
import { SharingDataService } from '../../services/sharing-data.service';
import { BehaviorSubject, of } from 'rxjs';
import { Product } from '../../models/product';
import { Component, Input, Output, EventEmitter } from '@angular/core';
import { By } from '@angular/platform-browser';

// Mock del componente ProductCard para aislar la prueba a CatalogComponent
@Component({
  selector: 'app-product-card',
  template: '<div>Mock Product Card</div>'
})
class MockProductCardComponent {
  @Input() product!: Product;
  @Output() addToCartClicked = new EventEmitter<Product>();
}

describe('CatalogComponent', () => {
  let component: CatalogComponent;
  let fixture: ComponentFixture<CatalogComponent>;
  let mockProductService: any;
  let mockSharingDataService: any;
  let productsSubject: BehaviorSubject<Product[]>;

  const mockProducts: Product[] = [
    { id: 1, name: 'Product 1', price: 10, category: 'Cat 1', image: 'img1.jpg' },
    { id: 2, name: 'Product 2', price: 20, category: 'Cat 2', image: 'img2.jpg' },
    { id: 3, name: 'Product 3', price: 30, category: 'Cat 1', image: 'img3.jpg' },
    { id: 4, name: 'Product 4', price: 40, category: 'Cat 2', image: 'img4.jpg' },
    { id: 5, name: 'Product 5', price: 50, category: 'Cat 1', image: 'img5.jpg' },
    { id: 6, name: 'Product 6', price: 60, category: 'Cat 2', image: 'img6.jpg' },
  ];

  beforeEach(async () => {
    productsSubject = new BehaviorSubject<Product[]>([]); // Usar BehaviorSubject para simular el observable

    // Crear mocks para los servicios
    mockProductService = jasmine.createSpyObj('ProductService', ['loadProducts']);
    mockProductService.products$ = productsSubject.asObservable(); // Asignar el observable mockeado

    mockSharingDataService = jasmine.createSpyObj('SharingDataService', ['productEventEmitter']);
    mockSharingDataService.productEventEmitter = jasmine.createSpyObj('EventEmitter', ['emit']);


    await TestBed.configureTestingModule({
      imports: [CatalogComponent], // Importar el componente standalone
      declarations: [MockProductCardComponent], // Declarar el mock del ProductCard
      providers: [
        // Proveer los mocks en lugar de los servicios reales
        { provide: ProductService, useValue: mockProductService },
        { provide: SharingDataService, useValue: mockSharingDataService }
      ]
    })
    .overrideComponent(CatalogComponent, { // Sobrescribir la plantilla para usar el mock
      set: {
        template: `
          <div class="catalog-container">
              <div class="product-list-container">
                  @for (product of paginatedProducts$ | async; track product.id) {
                      <app-product-card
                          [product]="product"
                          (addToCartClicked)="onProductSelected($event)">
                      </app-product-card>
                  } @empty {
                      <p class="empty-message">No hay productos disponibles en el catálogo.</p>
                  }
              </div>

              <div class="pagination-controls">
                  <button class="btn previous-button" (click)="previousPage()" [disabled]="(currentPage$ | async) === 1">Anterior</button>
                  <span class="page-info">Página {{ currentPage$ | async }} de {{ totalPages }}</span>
                  <button class="btn next-button" (click)="nextPage()" [disabled]="(currentPage$ | async) === totalPages">Siguiente</button>
              </div>
          </div>
        `
      }
    })
    .compileComponents(); // Compilar el componente y su plantilla

    fixture = TestBed.createComponent(CatalogComponent);
    component = fixture.componentInstance;
    // No llamar a fixture.detectChanges() aquí, lo haremos después de emitir productos
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call loadProducts on ngOnInit', () => {
    component.ngOnInit();
    expect(mockProductService.loadProducts).toHaveBeenCalled();
  });


  it('should display product cards when products are loaded', () => {
    component.ngOnInit();
    productsSubject.next(mockProducts);
    fixture.detectChanges();

    const productCards = fixture.debugElement.queryAll(By.css('app-product-card'));
    expect(productCards.length).toBe(component.itemsPerPage); // Debe mostrar solo los items de la primera página
    const emptyMessage = fixture.debugElement.query(By.css('.empty-message'));
    expect(emptyMessage).toBeFalsy(); // El mensaje vacío no debe estar presente
  });

  it('should display empty message when no products are available', () => {
    component.ngOnInit();
    productsSubject.next([]); // Emitir un array vacío
    fixture.detectChanges();

    const productCards = fixture.debugElement.queryAll(By.css('app-product-card'));
    expect(productCards.length).toBe(0); // No debe haber product cards
    const emptyMessage = fixture.debugElement.query(By.css('.empty-message'));
    expect(emptyMessage).toBeTruthy(); // El mensaje vacío debe estar presente
    expect(emptyMessage.nativeElement.textContent).toContain('No hay productos disponibles');
  });

  it('should emit product through SharingDataService when onProductSelected is called', () => {
    const selectedProduct: Product = { id: 1, name: 'Selected Prod', price: 100, category: '', image: '' };
    component.onProductSelected(selectedProduct);
    expect(mockSharingDataService.productEventEmitter.emit).toHaveBeenCalledWith(selectedProduct);
  });

  describe('Pagination', () => {
    beforeEach(() => {
      component.ngOnInit();
      productsSubject.next(mockProducts); // Cargar productos para las pruebas de paginación
      fixture.detectChanges();
    });

    it('should calculate totalPages correctly', () => {
      // mockProducts tiene 6 items, itemsPerPage es 4 por defecto
      expect(component.totalPages).toBe(2); // ceil(6/4) = 2
    });

  });
});
