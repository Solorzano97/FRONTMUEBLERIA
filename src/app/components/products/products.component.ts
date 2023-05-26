import { Component } from '@angular/core';
import { Product, ProductInCart } from 'src/app/interfaces/product.interface';
import { CartService } from 'src/app/services/cart.service';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss'],
})
export class ProductsComponent {
  products: Product[] = [];
  search: string = '';

  ngOnInit(): void {}

  constructor(
    private readonly productService: ProductService,
    private readonly cartService: CartService
  ) {}

  searchProducts(): void {
    if (!this.search || this.search === '') {
      this.productService.getProducts().subscribe((response) => {
        this.products = response;
      });
    } else {
      this.productService
        .getProductsBySearch(this.search)
        .subscribe((response) => {
          this.products = response;
        });
    }
  }

  addToCart(product: Product) {
    this.cartService.addProduct(product);
  }
}
