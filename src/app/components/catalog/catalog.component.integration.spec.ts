import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CatalogComponent } from './catalog.component';
import { ProductService } from '../../services/product.service';
import { SharingDataService } from '../../services/sharing-data.service';
import { BehaviorSubject, of } from 'rxjs';
import { Product } from '../../models/product';
import { Component, Input, Output, EventEmitter } from '@angular/core';
import { By } from '@angular/platform-browser';
import { RouterTestingModule } from '@angular/router/testing'; // Necesario si usas routerLink o navegación

// No mockeamos ProductCardComponent completamente, lo incluimos para la integración
// Si ProductCardComponent tiene dependencias complejas, podrías mockear esas dependencias
// dentro de su propio TestBed o proveerlas aquí.

describe('CatalogComponent Integration Tests', () => {
  let catalogComponent: CatalogComponent;
  let catalogFixture: ComponentFixture<CatalogComponent>;
  let mockProductService: any;
  let sharingDataService: SharingDataService; // Usamos el servicio real
  let productsSubject: BehaviorSubject<Product[]>;

  const mockProducts: Product[] = [
    { id: 1, name: 'Product 1', price: 10, category: 'Cat 1', image: 'img1.jpg' },
    { id: 2, name: 'Product 2', price: 20, category: 'Cat 2', image: 'img2.jpg' },
  ];

  beforeEach(async () => {
    productsSubject = new BehaviorSubject<Product[]>([]);

    // Mock parcial del ProductService si no quieres hacer llamadas HTTP reales
    mockProductService = jasmine.createSpyObj('ProductService', ['loadProducts']);
    mockProductService.products$ = productsSubject.asObservable();

    await TestBed.configureTestingModule({
      imports: [
        CatalogComponent, // Importar el componente standalone real
        // ProductCardComponent, // Importar el componente ProductCard real si no está en imports de CatalogComponent
        RouterTestingModule // Añadir si hay navegación involucrada
      ],
      providers: [
        { provide: ProductService, useValue: mockProductService },
        SharingDataService // Proveer el servicio real
      ]
    })
    .compileComponents();

    catalogFixture = TestBed.createComponent(CatalogComponent);
    catalogComponent = catalogFixture.componentInstance;
    sharingDataService = TestBed.inject(SharingDataService); // Inyectar el servicio real
  });

  it('should emit the correct product through SharingDataService when a product card button is clicked', (done) => {
    // Suscribirse al evento del servicio antes de interactuar con los componentes
    sharingDataService.productEventEmitter.subscribe((product: Product) => {
      expect(product).toEqual(mockProducts[0]); // Verificar que el producto emitido es el esperado
      done(); // Marcar la prueba como completada
    });

    // Cargar productos en el catálogo
    catalogComponent.ngOnInit();
    productsSubject.next(mockProducts);
    catalogFixture.detectChanges(); // Actualizar la vista para renderizar las product cards

    // Encontrar el primer botón "Agregar al carro" dentro de una product card
    const productCardDebugElement = catalogFixture.debugElement.query(By.css('app-product-card'));
    expect(productCardDebugElement).toBeTruthy('Debe haber al menos una product card');

    const addButton: HTMLButtonElement = productCardDebugElement.query(By.css('.add-to-cart-btn')).nativeElement;
    expect(addButton).toBeTruthy('Debe haber un botón de agregar al carro');

    // Simular el click en el botón
    addButton.click();

    // La aserción se realiza dentro de la suscripción del observable
  });

  // Puedes añadir más pruebas de integración aquí, por ejemplo:
  // - Probar que al agregar un producto, el contador en el Navbar se actualiza (requeriría incluir NavbarComponent)
  // - Probar que al agregar un producto, el CartAppComponent actualiza su lista de ítems (requeriría incluir CartAppComponent)
  // - Probar el flujo completo de agregar y luego eliminar un producto.

});