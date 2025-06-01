import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductService } from '../../services/product.service';
import { Router } from '@angular/router';
import { Product } from '../../models/product.model';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-landing',
  imports: [FormsModule, CommonModule],
  templateUrl: './landing.component.html',
  styleUrl: './landing.component.css'
})
export class LandingComponent implements OnInit {

  product!: Product;
  selectedVariant: string = '';
  quantity: number = 1;

  constructor(private productService:ProductService, private router: Router){}

  ngOnInit(){
    this.product = this.productService.getProduct();
    this.selectedVariant = this.product.variants[0];
  }

  buyNow():void{
      const data = {
        product:this.product,
        selectedVariant:this.selectedVariant,
        quantity:this.quantity
      }
      this.router.navigate(['/checkout'],{state:data});

  }
}
