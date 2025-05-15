import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NavbarComponent } from './navbar.component';
import { By } from '@angular/platform-browser';
import { RouterTestingModule } from '@angular/router/testing'; // Importar para probar routerLink

describe('NavbarComponent', () => {
  let component: NavbarComponent;
  let fixture: ComponentFixture<NavbarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        NavbarComponent,
        RouterTestingModule // Añadir RouterTestingModule para probar routerLink
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NavbarComponent);
    component = fixture.componentInstance;
    // No llamar a fixture.detectChanges() aquí, lo haremos en cada test si es necesario
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display the correct number of items in the cart link', () => {
    // Simular datos de entrada con 3 ítems
    component.items = [
      { product: { id: 1, name: 'Prod1', price: 10, category: 'Cat1', image: 'img1.jpg' }, quantity: 2 },
      { product: { id: 2, name: 'Prod2', price: 15, category: 'Cat2', image: 'img2.jpg' }, quantity: 1 },
      { product: { id: 3, name: 'Prod3', price: 5, category: 'Cat3', image: 'img3.jpg' }, quantity: 3 }
    ];
    component.total = 50; // El total no se muestra en la plantilla actual, pero lo mantenemos por si acaso

    fixture.detectChanges(); // Disparar la detección de cambios para actualizar la vista

    // Buscar el enlace del carrito por su routerLink o clase
    const cartLinkElement = fixture.debugElement.query(By.css('a[routerLink="/cart"]'));

    // Verificar que el elemento existe y muestra el texto correcto con el número de ítems
    expect(cartLinkElement).toBeTruthy();
    expect(cartLinkElement.nativeElement.textContent).toContain(`Cart (${component.items.length})`); // Verifica el número de ítems
  });

  it('should display 0 items when the items array is empty', () => {
    // Simular un carro vacío
    component.items = [];
    component.total = 0;

    fixture.detectChanges(); // Disparar la detección de cambios

    const cartLinkElement = fixture.debugElement.query(By.css('a[routerLink="/cart"]'));

    expect(cartLinkElement).toBeTruthy();
    expect(cartLinkElement.nativeElement.textContent).toContain('Cart (0)'); // Debe mostrar 0 ítems
  });

  it('should have correct routerLink for Catalog', () => {
    fixture.detectChanges();
    const catalogLinkElement = fixture.debugElement.query(By.css('a[routerLink="/catalog"]'));
    expect(catalogLinkElement).toBeTruthy();
    expect(catalogLinkElement.nativeElement.getAttribute('href')).toBe('/catalog');
  });

  it('should have correct routerLink for Cart', () => {
    fixture.detectChanges();
    const cartLinkElement = fixture.debugElement.query(By.css('a[routerLink="/cart"]'));
    expect(cartLinkElement).toBeTruthy();
    expect(cartLinkElement.nativeElement.getAttribute('href')).toBe('/cart');
  });

  // Nota: Probar el 'state' pasado a routerLink es más complejo y a menudo
  // requiere mockear el Router o usar RouterTestingModule de forma más avanzada.
  // Para pruebas sencillas, verificar el routerLink es suficiente.

});
