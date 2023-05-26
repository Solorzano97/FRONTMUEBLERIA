import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ProductService } from 'src/app/services/product.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  username: string = '';
  password: string = '';

  constructor(
    private readonly productService: ProductService,
    private readonly router: Router
  ) {}
  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
  }

  login() {
    this.productService
      .getUserValidation(this.username, this.password)
      .subscribe({
        next: (response) => {
          if (response.length > 0) {
            Swal.fire({
              icon: 'success',
              title: 'Logueado',
              text: `El usuario se ha validado correctamente`,
            }).then((result) => {
              if (result.isConfirmed) {
                localStorage.setItem("isLoggedIn", "true")
                this.router.navigate(['/']);
              }
            });
          } else {
            Swal.fire({
              icon: 'error',
              title: 'Error',
              text: `Credenciales Incorrectas`,
            });
          }
        },
        error: () => {
          Swal.fire({
            icon: 'error',
            title: 'Error',
            text: `Credenciales Incorrectas`,
          });
        },
      });
  }

  register() {
    
  }
}
