import { Injectable } from '@angular/core';
import { Product } from '../models/product';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, tap } from 'rxjs'; // Importar BehaviorSubject y tap

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private apiUrl = 'https://devsapihub.com/api-fast-food';
  private _productsSubject = new BehaviorSubject<Product[]>([]);
  public products$: Observable<Product[]> = this._productsSubject.asObservable();

  constructor(private http: HttpClient) { }

  // Este método ahora solo inicia la carga de datos
  loadProducts(): void {
    this.http.get<Product[]>(this.apiUrl).pipe(
      tap(products => this._productsSubject.next(products))
    ).subscribe();
  }
}
