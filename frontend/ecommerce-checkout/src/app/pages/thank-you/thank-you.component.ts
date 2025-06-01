import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Route } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-thank-you',
  imports: [CommonModule],
  templateUrl: './thank-you.component.html',
  styleUrl: './thank-you.component.css'
})
export class ThankYouComponent implements OnInit {
  orderId: string = '';
  customer: any;
  product: any;
  status: string = '';

  constructor(private route:ActivatedRoute){}

  ngOnInit():void{
    this.orderId = this.route.snapshot.paramMap.get('id') || 'Unknown';  //Grabs the order ID from URL (/thank-you/:id)
    const state = history.state;  //get the the customer, product, and status passed via router.navigate()

    this.customer = state.customer;
    this.product = state.product;
    this.status = state.status;

  }
}
