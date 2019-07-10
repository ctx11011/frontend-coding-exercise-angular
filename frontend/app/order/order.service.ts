import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Order } from './models/interfaces';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class OrderService {
  private readonly baseUrl = 'http://localhost:4300';

  constructor(private readonly http: HttpClient) {}

  getOrders(page = 1): Observable<Order[]> {
    return this.http.get<Order[]>(`${this.baseUrl}/orders?page=${page}`);
  }

  getOrder(id: number): Observable<Order> {
    return this.http.get<Order>(`${this.baseUrl}/orders/${id}`);
  }
}
