import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { OrderService } from '../../services/order.service';
import { errorContext } from 'rxjs/internal/util/errorContext';


@Component({
  selector: 'app-checkout',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './checkout.component.html',
  styleUrl: './checkout.component.css'
})
export class CheckoutComponent implements OnInit {

  checkoutForm !: FormGroup;
  productData: any;

  constructor(private fb:FormBuilder, private router:Router, private orderService:OrderService){}

  ngOnInit(): void {
    this.productData = history.state;  // getting this data from previous component
    
    // Optional safety check
    if (!this.productData?.product) {
      console.warn('No product data! Redirecting...');
      this.router.navigate(['/']);
    }
    // Build the form using FormBuilder
    this.checkoutForm = this.fb.group({
      fullName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', [Validators.required, Validators.pattern(/^\d{10}$/)]],
      address: ['', Validators.required],
      city: ['', Validators.required],
      state: ['', Validators.required],
      zip: ['', Validators.required],
      cardNumber: ['', [Validators.required, Validators.pattern(/^\d{16}$/)]],
      expiry: ['', [Validators.required, this.futureDateValidator]],
      cvv: ['', [Validators.required, Validators.pattern(/^\d{3}$/)]]
    });
  }

  // Custom validator for future expiry date
  futureDateValidator(control: any) {
    const inputDate = new Date(control.value);
    const today = new Date();
    return inputDate > today ? null : { invalidDate: true };
  }

  onSubmit(): void {
    if (this.checkoutForm.invalid) {
      this.checkoutForm.markAllAsTouched();  //Shows all error messages when the user submits invalid form
      return;
    }

    const orderPayload = {
      customer: this.checkoutForm.value,
      product: this.productData
    };

    this.orderService.createOrder(orderPayload).subscribe({
      next:(res)=>{
        // Go to Thank You page with orderId and status
        this.router.navigate(['/thank-you', res.orderId], {
          state: {
            customer: this.checkoutForm.value,
            product: this.productData,
            status: res.status
          }
        });
      },
      error:(err)=>{
        alert('Something went wrong. Please try again.');
        console.error('Order failed:', err);
      }
    });

    console.log('Order Submitted:', orderPayload);

  }

}
