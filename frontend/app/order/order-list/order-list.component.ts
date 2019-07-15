import { Component, Input } from '@angular/core';
import { Order, Column, DataType, Sorting, Payment } from '../models/interfaces';
import { OrderService } from '../order.service';

@Component({
  selector: 'app-order-list',
  templateUrl: './order-list.component.html',
  styleUrls: ['./order-list.component.scss'],
})
export class OrderListComponent {
  @Input() orders: Order[] = [];
  @Input() sorting: Sorting;

  columns: Column[] = [
    {
      label: 'Customer',
      field: 'customer',
      callback: () => this.sort('customer', DataType.STRING)
    },
    {
      label: 'Vendor',
      field: 'vendor',
      callback: () => this.sort('vendor', DataType.STRING)
    },
    {
      label: 'Headcount',
      field: 'headcount',
      class: 'text-right',
      callback: () => this.sort('headcount', DataType.NUMBER)
    },
    {
      label: 'Delivered',
      field: 'deliveredAt',
      class: 'text-right',
      callback: () => this.sort('deliveredAt', DataType.DATE),
      format: d => this.formatDate(d)
    },
    {
      label: 'Requested',
      field: 'requestedDeliveryDate',
      class: 'text-right',
      callback: () => this.sort('requestedDeliveryDate', DataType.DATE),
      format: d => this.formatDate(d)
    },
    {
      label: 'Payment',
      field: 'paymentType',
      callback: () => this.sort('paymentType', DataType.STRING),
      format: p => Payment[p]
    },
    {
      label: 'Total Price',
      field: 'price.total',
      class: 'text-right',
      callback: () => this.sort('price.total', DataType.NUMBER),
      format: p => p.toFixed(2)
    },
  ];

  constructor(private readonly orderService: OrderService) {}

  sort(field: string, type: DataType) {
    this.orderService.sort(field, type);
  }

  getColumnClass(column: Column): string {
    const css = [];
    if (column.class) {
      css.push(column.class);
    }
    if (this.sorting.field === column.field) {
      css.push(`sorting-${this.sorting.direction}`);
    }
    return css.join(' ');
  }

  getData(field: string, order: Order) {
    const properties = field.split('.');
    return properties.reduce((acc, val) => {
      return acc && acc[val] || null;
    }, order);
  }

  private formatDate(date: string): string {
    if (!date) {
      return;
    }
    const d = new Date(date);
    const day =  `0${d.getDate()}`.slice(-2);
    const month =  `0${(d.getMonth() + 1)}`.slice(-2);
    const year =  d.getFullYear();
    return `${day}-${month}-${year}`;
  }
}
