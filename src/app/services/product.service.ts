import { Injectable } from '@angular/core';
import { Product, ProductInCart } from '../interfaces/product.interface';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { GeneralIncome } from '../interfaces/general-income.interface';
import { User } from '../interfaces/user.interface';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  constructor(private readonly http: HttpClient) {}

  getProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(`http://localhost:3000/products`)
  }

  getProductsBySearch(query: string): Observable<Product[]> {
    return this.http.get<Product[]>(`http://localhost:3000/products/${query}`)
  }

  getProductsByPrice(): Observable<Product[]> {
    return this.http.get<Product[]>(`http://localhost:3000/price`)
  }

  getProductsByNewest(): Observable<Product[]> {
    return this.http.get<Product[]>(`http://localhost:3000/new`)
  }

  createIncome(provider: number, total: number , cantidad: number): Observable<GeneralIncome[]> {
    return this.http.post<GeneralIncome[]>(`http://localhost:3000/general-invoice/${provider}/${total}/${cantidad}`,'')
  }

  createDetailIncome(cantidad: number, idCompra: number): Observable<GeneralIncome[]> {
    return this.http.post<GeneralIncome[]>(`http://localhost:3000/detail-invoice/${cantidad}/${idCompra}`,'')
  }

  getUserValidation(user: string, password: string): Observable<User[]> {
    return this.http.get<User[]>(`http://localhost:3000/user/${user}/${password}`)
  }


}
