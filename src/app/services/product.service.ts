import { Injectable } from '@angular/core';
import { Product } from '../models/product';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, tap } from 'rxjs'; // Importar BehaviorSubject y tap

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private apiUrl = 'https://devsapihub.com/api-fast-food';
  // Usamos BehaviorSubject para mantener el estado actual de los productos
  private _productsSubject = new BehaviorSubject<Product[]>([]);
  // Exponemos el estado como un Observable público
  public products$: Observable<Product[]> = this._productsSubject.asObservable();

  constructor(private http: HttpClient) { }

  // Este método ahora solo inicia la carga de datos
  loadProducts(): void {
    this.http.get<Product[]>(this.apiUrl).pipe(
      // Usamos tap para actualizar el BehaviorSubject con los datos recibidos
      tap(products => this._productsSubject.next(products))
    ).subscribe(); // Nos suscribimos aquí para que la llamada HTTP se ejecute
  }

  // El método findAll ya no es necesario en esta arquitectura,
  // los componentes se suscribirán directamente a products$
  // findAll(): Observable<Product[]> {
  //   return this.http.get<Product[]>(this.apiUrl);
  // }
}
