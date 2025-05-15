import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing'; // Importar módulos de testing HTTP
import { ProductService } from './product.service';
import { Product } from '../models/product'; // Asegúrate de que la ruta a tu modelo Product sea correcta

describe('ProductService', () => {
  let service: ProductService;
  let httpTestingController: HttpTestingController; // Controlador para mockear peticiones HTTP
  const apiUrl = 'https://devsapihub.com/api-fast-food'; // URL del servicio

  const mockProducts: Product[] = [
    { id: 1, name: 'Product 1', price: 10, category: 'Cat 1', image: 'img1.jpg' },
    { id: 2, name: 'Product 2', price: 20, category: 'Cat 2', image: 'img2.jpg' },
  ];

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule], // Importar el módulo de testing HTTP
      providers: [ProductService] // Proveer el servicio a testear
    });

    service = TestBed.inject(ProductService);
    httpTestingController = TestBed.inject(HttpTestingController); // Inyectar el controlador
  });

  afterEach(() => {
    // Verificar que no hay peticiones HTTP pendientes después de cada test
    httpTestingController.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('loadProducts should call the API and update products$', () => {
    // Suscribirse al observable antes de llamar a loadProducts
    let products: Product[] = [];
    service.products$.subscribe(p => {
      products = p;
    });

    // Llamar al método que realiza la petición HTTP
    service.loadProducts();

    // Expect a GET request to the API URL
    const req = httpTestingController.expectOne(apiUrl);
    expect(req.request.method).toBe('GET');

    // Respond with mock data
    req.flush(mockProducts);

    // Verify that the products$ observable emitted the mock data
    expect(products).toEqual(mockProducts);
  });

  it('products$ should initially be an empty array', (done) => {
    // Suscribirse y verificar el valor inicial
    service.products$.subscribe(products => {
      expect(products).toEqual([]);
      done(); // Usar done() para pruebas asíncronas con observables
    });
  });

  // Puedes añadir más pruebas aquí, por ejemplo, para manejar errores HTTP
});