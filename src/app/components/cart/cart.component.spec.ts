import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CartComponent } from './cart.component';
import { SharingDataService } from '../../services/sharing-data.service';
import { Router } from '@angular/router';

describe('CartComponent', () => {
  let component: CartComponent;
  let fixture: ComponentFixture<CartComponent>;
  let mockSharingDataService: any;
  let mockRouter: any;

  beforeEach(async () => {
    // Crear mocks para los servicios
    mockSharingDataService = jasmine.createSpyObj('SharingDataService', ['idProductEventEmitter']);
    mockSharingDataService.idProductEventEmitter = jasmine.createSpyObj('EventEmitter', ['emit']);

    mockRouter = jasmine.createSpyObj('Router', ['getCurrentNavigation']);
    // Configurar el mock del router para simular el paso de estado
    mockRouter.getCurrentNavigation.and.returnValue({
      extras: {
        state: {
          items: [{ product: { id: 1, name: 'Test Product', price: 10 }, quantity: 2 }],
          total: 20
        }
      }
    });


    await TestBed.configureTestingModule({
      imports: [CartComponent], // Importar el componente standalone
      providers: [
        // Proveer los mocks en lugar de los servicios reales
        { provide: SharingDataService, useValue: mockSharingDataService },
        { provide: Router, useValue: mockRouter }
      ]
    })
    .compileComponents(); // Compilar el componente y su plantilla

    fixture = TestBed.createComponent(CartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges(); // Detectar cambios para inicializar el componente (llama a ngOnInit y constructor)
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize items and total from router state', () => {
    // Verificar que items y total se cargan correctamente del mock del router
    expect(component.items.length).toBe(1);
    expect(component.items[0].product.name).toBe('Test Product');
    expect(component.total).toBe(20);
  });

  it('should emit product id when onDeleteCart is called', () => {
    const productId = 123;
    component.onDeleteCart(productId);
    // Verificar que el método emit del EventEmitter mockeado fue llamado con el ID correcto
    expect(mockSharingDataService.idProductEventEmitter.emit).toHaveBeenCalledWith(productId);
  });

  // Ejemplo de prueba de la plantilla (verificando si la tabla se muestra)
  it('should display the cart table when items are present', () => {
    // Asegurarse de que el mock del router devuelve items
    mockRouter.getCurrentNavigation.and.returnValue({
      extras: {
        state: {
          items: [{ product: { id: 1, name: 'Test Product', price: 10 }, quantity: 2 }],
          total: 20
        }
      }
    });
    // Volver a crear el componente para que use el nuevo mock
    fixture = TestBed.createComponent(CartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

    const compiled = fixture.nativeElement as HTMLElement;
    const table = compiled.querySelector('.cart-table'); // Usar la clase de la tabla
    const emptyMessage = compiled.querySelector('.empty-cart-message'); // Usar la clase del mensaje vacío

    expect(table).toBeTruthy(); // La tabla debe existir
    expect(emptyMessage).toBeFalsy(); // El mensaje vacío no debe existir
  });

  // Ejemplo de prueba de la plantilla (verificando si el mensaje vacío se muestra)
  it('should display the empty cart message when no items are present', () => {
     // Configurar el mock del router para devolver un array de items vacío
    mockRouter.getCurrentNavigation.and.returnValue({
      extras: {
        state: {
          items: [],
          total: 0
        }
      }
    });
    // Volver a crear el componente para que use el nuevo mock
    fixture = TestBed.createComponent(CartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

    const compiled = fixture.nativeElement as HTMLElement;
    const table = compiled.querySelector('.cart-table'); // Usar la clase de la tabla
    const emptyMessage = compiled.querySelector('.empty-cart-message'); // Usar la clase del mensaje vacío

    expect(table).toBeFalsy(); // La tabla no debe existir
    expect(emptyMessage).toBeTruthy(); // El mensaje vacío debe existir
    expect(emptyMessage?.textContent).toContain('No hay productos en el carro'); // Verificar el texto
  });

  // Puedes añadir más pruebas para verificar el contenido de las celdas,
  // la interacción con el botón de eliminar, etc.

});
