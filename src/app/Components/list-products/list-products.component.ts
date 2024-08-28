import { Component, NgModule, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { ProductService } from '../../Services/product.service';
import { FormsModule, NgModel } from '@angular/forms';
import { NgStyle, NgIf } from '@angular/common';
import { ProductDetailsComponent } from '../product-details/product-details.component';

@Component({
  selector: 'app-list-products',
  standalone: true,
  imports: [NgStyle, NgIf, FormsModule, RouterModule, ProductDetailsComponent],
  templateUrl: './list-products.component.html',
  styleUrl: './list-products.component.css'
})
export class ListProductsComponent implements OnInit{

  productList: any[] = [];

  

  resetVisible: boolean = true;
  resultShown: boolean = true;
  detailsShown:boolean = false;
  resultnotshown: boolean = false;
  searchID: number = 0;

  
  rate: number = 0;
  count: number = 0;
  id: number =0;
  title: string ="";
  price: number =0;
  description: string="";
  category: string="";
  image: string="";

  selectedProduct: any = null;

  showDetails(product: any) {
    this.selectedProduct = product;
    if(this.resultShown){
      this.resultShown = !this.resultShown;
    }
    if(this.resultnotshown){
      this.resultnotshown = !this.resultnotshown
    }
  }
  
  constructor(private ProductServ:ProductService){
    console.log("Openeddd!");

  }

  
  ngOnInit() {
    
    this.ProductServ.getAllProducts().subscribe((data)=>{
      console.log(data);
      this.productList = data;
    })
  }

  reset(){
    if(!this.resultShown){
      this.resultShown = !this.resultShown;
      this.selectedProduct = null;
    }
    if(this.resultnotshown){
      this.resultnotshown = !this.resultnotshown;
    }

  }



  addToCart(productId: number) {
    this.ProductServ.addToCart(productId);
    console.log(`${productId}`, " added to cart");
    
  }


  Search() {
    let productFound = false;
    
    for (const product of this.productList) {
      if (product.id == this.searchID) {
        this.id = this.searchID;
        this.rate = product.rate;
        this.count = product.count;
        this.title = product.title;
        this.price = product.price;
        this.description = product.description;
        this.category = product.category;
        this.image = product.image;
        
        productFound = true;
        break; // Stop searching once the product is found
      }
    }
  
    if (!productFound) {
      console.error("Product not found with ID: " + this.searchID);
      // Handle the case where the product is not found, e.g., show a message
    }
  
    if(!this.resultnotshown){
      this.resultShown = !this.resultShown;
      this.resultnotshown = !this.resultnotshown;
    }
    

    if(this.selectedProduct){
      this.selectedProduct = null;
    }
  }
  


  
}
