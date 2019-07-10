import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Order } from './models/interfaces';
// import { Observable } from 'rxjs/Observable';

@Injectable()
export class OrderService {
  constructor(private readonly http: HttpClient) {}

  getOrders(page = 1) {
    return this.http.get<Order[]>(`http://localhost:4300/orders?page=${page}`);
  }
}
