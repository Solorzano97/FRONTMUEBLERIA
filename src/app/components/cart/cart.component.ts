import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { GeneralIncome } from 'src/app/interfaces/general-income.interface';
import { ProductInCart } from 'src/app/interfaces/product.interface';
import { CartService } from 'src/app/services/cart.service';
import { ProductService } from 'src/app/services/product.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss'],
})
export class CartComponent {
  products: ProductInCart[] = [];
  generalIncome!: GeneralIncome;

  constructor(
    private readonly cartService: CartService,
    private readonly productService: ProductService,
    private readonly router: Router
  ) {}

  ngOnInit(): void {
    this.products = this.cartService.getCart();
  }

  cantidad: number = 0;

  decrementCart(index: number) {
    this.products[index].UNITS--;
  }

  incrementCart(index: number) {
    this.products[index].UNITS++;
  this.cantidad = this.products[index].UNITS;

  }

  deleteCartItem(index: number) {
    this.products.splice(index, 1);
    this.cartService.deleteProduct(index);
  }

  addUnits(event: any, index: number) {
    this.products[index].UNITS = event;
  }

  pay() {

    this.incrementCart;
    const min = 1;
    const max = 100;
    const randomNumber: number = Math.floor(Math.random() * (max - min + 1)) + min;
    let total: number = 0;
    let units: number = 0;

    this.products.forEach((prod) => {
      total = total + prod.PRICE;
    });

    this.productService.createIncome(randomNumber, total , this.cantidad).subscribe({
      next: (response) => {
        if (response && response.length > 0) {
          this.generalIncome = response[0];
          this.products.forEach((pr) => {
            units = units + pr.UNITS;
          });
          this.productService
            .createDetailIncome(units, this.generalIncome.COG_COMPRA_GENERAL)
            .toPromise();
        }
      },
      complete: () => {
        Swal.fire({
          icon: 'success',
          title: 'Completado',
          text: `Se completó la compra, tu número de orden es: ${randomNumber}`,
        }).then((result) => {
          if (result.isConfirmed) {
            this.router.navigate(['/']);
          }
        });
      },
      error: () => {
        console.log('error');
      },
    });
  }
}
