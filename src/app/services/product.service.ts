import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { Product } from '../models/product'; 

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private apiUrl = 'https://devsapihub.com/api-fast-food';

  private productsSubject = new BehaviorSubject<Product[]>([]);
  products$ = this.productsSubject.asObservable();

  constructor(private http: HttpClient) { }

  loadProducts(): void {
    this.http.get<Product[]>(this.apiUrl).pipe(
      tap(products => this.productsSubject.next(products)),
      catchError(this.handleError)
    ).subscribe();
  }

  
  getProductById(id: number): Observable<Product> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.get<Product>(url).pipe(
      catchError(this.handleError)
    );
  }

  
  updateProduct(product: Product): Observable<Product> {
    const url = `${this.apiUrl}/product/${product.id}`;
    return this.http.put<Product>(url, product).pipe(
      tap(() => this.loadProducts()), 
      catchError(this.handleError)
    );
  }

  
  deleteProduct(id: number): Observable<void> {
    const url = `${this.apiUrl}/product/${id}`;
    return this.http.delete<void>(url).pipe(
      tap(() => this.loadProducts()), 
      catchError(this.handleError)
    );
  }

  private handleError(error: any): Observable<never> {
    console.error('An error occurred', error);
    return throwError(() => new Error(error.message || 'Server error'));
  }
}
