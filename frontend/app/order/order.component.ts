import { Component, OnInit } from '@angular/core';
import { OrderService } from './order.service';
import { Sorting, OrderResponse } from '../order/models/interfaces';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.scss'],
})
export class OrderComponent implements OnInit {

  response: OrderResponse;
  sorting: Sorting;

  constructor(private readonly orderService: OrderService) {}

  ngOnInit() {
    this.orderService.sorting.subscribe(
      sorting => {
        this.sorting = sorting;
        this.getPage();
      }
    );
  }

  getPage(page = 1) {
    return this.orderService
      .getOrders(page)
      .subscribe(
        response => this.response = response,
        // do something more meaningful here...
        error => console.error(error)
      );
  }
}
