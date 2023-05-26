import { Component } from '@angular/core';
import { Product } from 'src/app/interfaces/product.interface';
import { CartService } from 'src/app/services/cart.service';
import { ProductService } from 'src/app/services/product.service';
import { UtilService } from 'src/app/services/util.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent {
  products: Product[] = [];
  newProducts: Product[] = [];
  isLoggedIn: boolean = false;
  constructor(
    private readonly productService: ProductService,
    private readonly cartService: CartService,
    private readonly utilService: UtilService
  ) {}

  ngOnInit(): void {
    this.isLoggedIn =
      localStorage.getItem('isLoggedIn') === 'true' ? true : false;
    this.getProducts();
    this.getNewProducts();
  }

  getProducts() {
    this.productService.getProductsByPrice().subscribe((response) => {
      this.products = response;
    });
  }

  getNewProducts() {
    this.productService.getProductsByNewest().subscribe((response) => {
      this.newProducts = response;
    });
  }

  addToCart(product: Product) {
    this.cartService.addProduct(product);
    this.utilService.openSnackBar("Producto Agregado Correctamente", "Cerrar")
  }
}
