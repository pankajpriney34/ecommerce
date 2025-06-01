import { Injectable } from '@angular/core';
import { Product } from '../models/product.model';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor() { }

    private product: Product = {
      id: 1,
      title: 'Converse Chuck Taylor All Star II Hi',
      description: 'Premium high-top sneakers with modern comfort upgrades.',
      price: 79.99,
      imageUrl: 'https://placehold.co/300x300',
      variants: ['Red', 'Blue', 'Black'],
      stock: 10,
    };

    getProduct(): Product {
      return this.product;
    }    
}
