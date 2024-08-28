import { Component } from '@angular/core';
import { ProductService } from '../../Services/product.service';
import { HttpClient } from '@angular/common/http';
import { NgFor, NgIf } from '@angular/common';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [NgIf, NgFor],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css'
})
export class CartComponent {


  cartProducts: any[] = [];

  constructor(private cartService: ProductService, private http: HttpClient) {}

  ngOnInit() {
    this.cartService.cartItems$.subscribe((products: any[]) => {
      this.cartProducts = products;
    });
  }

  fetchProductById(productId: number) {
    this.http.get<any>(`http://localhost:3004/getById/${productId}`)
      .subscribe(product => {
        this.cartProducts.push(product);
      });
  }

  getTotalPrice(): number {
    return this.cartProducts.reduce((total, product) => {
      return total + product.price;
    }, 0);
  }

  removeFromCart(index: number) {
    this.cartProducts.splice(index, 1);
    this.cartService.updateCart(this.cartProducts);
  }
}
