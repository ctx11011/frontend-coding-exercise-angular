import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { DataType, Sorting, SortDirection, OrderResponse } from './models/interfaces';
import { Observable } from 'rxjs/Observable';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

@Injectable()
export class OrderService {
  private readonly baseUrl = 'http://localhost:4300';
  private orderSorting: Sorting = {
    field: 'requestedDeliveryDate',
    type: DataType.DATE,
    direction: SortDirection.DESC
  };
  private readonly sortingSubject = new BehaviorSubject<Sorting>(this.orderSorting);

  get sorting(): Observable<Sorting> {
    return this.sortingSubject.asObservable();
  }

  constructor(private readonly http: HttpClient) {}

  sort(field: string, type: DataType) {
    const direction = this.orderSorting.field === field
      ? this.orderSorting.direction === SortDirection.ASC ? SortDirection.DESC : SortDirection.ASC
      : this.orderSorting.direction;

    this.orderSorting = {
      field,
      type,
      direction
    };
    this.sortingSubject.next(this.orderSorting);
  }

  getOrders(page = 1): Observable<OrderResponse> {
    return this.http.get<OrderResponse>(`${this.baseUrl}/orders`, {
      params: {
        page: page.toString(),
        sort: this.orderSorting.field,
        direction: this.orderSorting.direction,
        type: this.orderSorting.type
      }
    });
  }
}
