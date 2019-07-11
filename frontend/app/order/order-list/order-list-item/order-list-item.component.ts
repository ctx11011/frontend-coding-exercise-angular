import { Component, Input } from '@angular/core';
import { Payment, Order } from '../../models/interfaces';

@Component({
  selector: '[app-order-list-item]',
  templateUrl: './order-list-item.component.html',
  styleUrls: ['./order-list-item.component.scss']
})
export class OrderListItemComponent {
  @Input() order: Order;

  paymentType(payment: Payment): string {
    return Payment[payment];
  }
}
