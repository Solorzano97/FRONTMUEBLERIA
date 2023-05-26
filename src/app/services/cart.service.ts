import { Injectable } from '@angular/core';
import { Product, ProductInCart } from '../interfaces/product.interface';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';
import { Observable } from 'rxjs';
import { GeneralIncome } from '../interfaces/general-income.interface';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  products: ProductInCart[] = [];
  productsSubject: BehaviorSubject<ProductInCart[]> = new BehaviorSubject<ProductInCart[]>(this.products);

  constructor() {}

  addProduct(product: Product) {
    const newProduct: ProductInCart = {
      ID: product.ID,
      NAME: product.NAME,
      DESCRIPTION: product.DESCRIPTION,
      EXISTENCE: product.EXISTENCE,
      PRICE: product.PRICE,
      UNITS: 1,
      IMAGEN: product.IMAGEN
    };
    this.products.push(newProduct);
    console.log(this.products.length)
  }

  deleteProduct(index: number) {
    this.products.splice(index, 1);
  }

  getCart() {
    return this.products;
  }

  incrementUnits(index: number, existence: number) {
    this.products[index].EXISTENCE = existence;
  }


  getCartForLength(): BehaviorSubject<ProductInCart[]> {
    return this.productsSubject;
  }



}
