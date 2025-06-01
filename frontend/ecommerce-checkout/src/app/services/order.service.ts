import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { OrderResponse } from '../models/order-response.model';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  private API_URL = 'http://localhost:5000/api/orders';

  constructor(private http:HttpClient) { }

  createOrder(orderPayload: any): Observable<OrderResponse>{
      return this.http.post<OrderResponse>(this.API_URL, orderPayload);
  }

}
