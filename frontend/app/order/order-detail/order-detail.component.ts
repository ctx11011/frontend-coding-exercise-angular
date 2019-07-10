import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { OrderService } from '../order.service';
import { Order } from '../models/interfaces';

@Component({
  selector: 'app-order-detail',
  templateUrl: './order-detail.component.html',
  styleUrls: ['./order-detail.component.scss'],
  providers: [OrderService]
})
export class OrderDetailComponent implements OnInit {

  order: Order;

  constructor(
    private readonly route: ActivatedRoute,
    private readonly orderService: OrderService
  ) { }

  ngOnInit() {
    this.route.params.subscribe((params: Params) => {
      this.orderService
        .getOrder(params.id)
        .subscribe(order => this.order = order);
    });
  }

}
