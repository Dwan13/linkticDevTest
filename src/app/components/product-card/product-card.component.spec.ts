import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ProductCardComponent } from './product-card.component';
import { By } from '@angular/platform-browser';
import { Product } from '../../models/product'; // Asegúrate de que la ruta a tu modelo Product sea correcta

describe('ProductCardComponent', () => {
  let component: ProductCardComponent;
  let fixture: ComponentFixture<ProductCardComponent>;

  // Mock de un producto para usar en las pruebas
  const mockProduct: Product = {
    id: 1,
    name: 'Test Product',
    price: 99.99,
    category: 'Electronics',
    image: 'test-image.jpg'
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProductCardComponent] // Importar el componente standalone
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProductCardComponent);
    component = fixture.componentInstance;
    // No llamar a fixture.detectChanges() aquí, lo haremos en cada test si es necesario
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display product details correctly', () => {
    // Asignar el mock product al input del componente
    component.product = mockProduct;
    fixture.detectChanges(); // Disparar la detección de cambios para actualizar la vista

    // Verificar que la imagen se muestra correctamente
    const imgElement: HTMLImageElement = fixture.debugElement.query(By.css('.product-image-container img')).nativeElement;
    expect(imgElement).toBeTruthy();
    expect(imgElement.src).toContain(mockProduct.image); // Verifica el src de la imagen
    expect(imgElement.alt).toBe(`${mockProduct.name} image`); // Verifica el alt de la imagen

    // Verificar que el nombre se muestra correctamente
    const nameElement = fixture.debugElement.query(By.css('.product-info h3')).nativeElement;
    expect(nameElement).toBeTruthy();
    expect(nameElement.textContent).toContain(mockProduct.name);

    // Verificar que la categoría se muestra correctamente
    const categoryElement = fixture.debugElement.query(By.css('.product-category')).nativeElement;
    expect(categoryElement).toBeTruthy();
    expect(categoryElement.textContent).toContain(mockProduct.category);

    // Verificar que el precio se muestra correctamente (considerando el pipe currency)
    const priceElement = fixture.debugElement.query(By.css('.product-price')).nativeElement;
    expect(priceElement).toBeTruthy();
    // La verificación del precio con el pipe currency puede ser un poco tricky.
    // Podemos verificar que contiene el valor numérico o una parte del formato esperado.
    // Aquí verificamos que contiene el valor numérico.
    expect(priceElement.textContent).toContain(mockProduct.price.toString());
    // O podrías verificar un formato específico si sabes cómo lo renderiza el pipe por defecto
    // expect(priceElement.textContent).toContain('$99.99'); // Ejemplo si el pipe usa '$' y 2 decimales
  });

  it('should emit addToCartClicked event with the product when the button is clicked', () => {
    // Asignar el mock product al input del componente
    component.product = mockProduct;
    fixture.detectChanges(); // Disparar la detección de cambios

    // Crear un espía para el EventEmitter
    jest.spyOn(component.addToCartClicked, 'emit');

    // Buscar el botón "Agregar al carro"
    const addButton: HTMLButtonElement = fixture.debugElement.query(By.css('.add-to-cart-btn')).nativeElement;
    expect(addButton).toBeTruthy();

    // Simular un click en el botón
    addButton.click();

    // Verificar que el evento emit fue llamado con el producto correcto
    expect(component.addToCartClicked.emit).toHaveBeenCalledWith(mockProduct);
  });

});
