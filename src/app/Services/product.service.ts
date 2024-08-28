import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { IProduct } from '../model/iproduct';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private http:HttpClient) { }

  getAllProducts():Observable<IProduct[]>{
    return this.http.get<IProduct[]>('http://localhost:3004/all');
  }
  getProductByID(id:number):Observable<IProduct>{
    return this.http.get<IProduct>(`http://localhost:3004/getById/${id}`);
  }

  private cartItemsSubject = new BehaviorSubject<number[]>([]);
  cartItems$ = this.cartItemsSubject.asObservable();

  addToCart(productId: number) {
    this.http.get<any>(`https://fakestoreapi.com/products/${productId}`).subscribe(product => {
      const currentItems = this.cartItemsSubject.value;
      this.cartItemsSubject.next([...currentItems, product]);
    });
  }

  updateCart(cartProducts: any[]) {
    this.cartItemsSubject.next(cartProducts);
  }
}
