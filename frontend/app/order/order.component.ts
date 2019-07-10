import { Component, OnInit } from '@angular/core';
import { OrderService } from './order.service';
import { Order } from '../order/models/interfaces';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.scss'],
  providers: [OrderService]
})
export class OrderComponent implements OnInit {

  orders: Order[] = [];

  constructor(private readonly orderService: OrderService) {}

  ngOnInit() {
    this.getPage();
  }

  getPage(page = 1) {
    return this.orderService
      .getOrders(page)
      .subscribe(
        orders => this.orders = orders
      );
  }
}
