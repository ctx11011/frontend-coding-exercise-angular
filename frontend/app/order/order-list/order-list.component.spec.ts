import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import { Component, Input, ViewChild } from '@angular/core';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs/observable/of';
import { OrderListComponent } from './order-list.component';
import { Order, Column, DataType, SortDirection } from '../models/interfaces';
import { OrderService } from '../order.service';


class MockOrderService {
  sorting = of({
    field: 'a'
  });
  sort(field: string, type: DataType) {}
  getOrders(page) {
    return of([]);
  }
}

@Component({
  template: `
    <app-order-list
      [orders]="orders"
      [sorting]="sorting"
    ></app-order-list>`
})
class HostComponent {
  @ViewChild(OrderListComponent) testComponent;
  sorting = {
    field: 'customer',
    type: DataType.STRING,
    direction: SortDirection.DESC
  };
  orders = [
    {
      id: 1824,
      lastModified: '2018-03-07T10:52:15.000Z',
      customer: 'AlphaBreakers',
      vendor: 'Mando\'s',
      commissionRate: 0.15,
      requestedDeliveryDate: '2018-04-09T07:30:00.000Z',
      price: {
        delivery: 0,
        items: 5299.75,
        total: 5299.75,
        vatRate: 20,
        vatableItems: 0,
        vatAmount: 0
      },
      paymentType: 'CARD',
      headcount: 83,
      servingStyle: 'INDIVIDUAL_PORTIONS',
      deliveredAt: '2018-04-09T08:56:36.000Z',
      delayMinutes: 0,
      lateReason: null
    },
    {
      id: 1906,
      lastModified: '2018-04-02T21:50:24.000Z',
      customer: 'Fixxie Tech',
      vendor: 'Mando\'s',
      commissionRate: 0.12,
      requestedDeliveryDate: '2018-06-20T14:00:00.000Z',
      price: {
        delivery: 20,
        items: 4137.15,
        total: 4157.15,
        vatRate: 10,
        vatableItems: 0,
        vatAmount: 0
      },
      paymentType: 'PAY_ON_ACCOUNT',
      headcount: 32,
      servingStyle: 'BUFFET',
      deliveredAt: null,
      delayMinutes: 0,
      lateReason: null
    }];
}

describe('OrderListComponent', () => {
  let component: HostComponent;
  let fixture: ComponentFixture<HostComponent>;
  let service: OrderService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        HostComponent,
        OrderListComponent,
      ],
      imports: [
        RouterTestingModule
      ],
      providers: [{
        provide: OrderService,
        useClass: MockOrderService,
      }]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HostComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    service = TestBed.get(OrderService);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should contain an order table', () => {
    const table = fixture.debugElement.query(By.css('table'));

    expect(table).toBeTruthy();
  });

  it('should inform when there are no orders', () => {
    component.orders = [];
    fixture.detectChanges();
    const table = fixture.debugElement.query(By.css('table'));

    expect(component.testComponent.orders.length).toEqual(0);
    expect(table.nativeElement.textContent).toContain('No orders');
  });

  it('should render order items', () => {
    const items = fixture.debugElement.queryAll(By.css('tbody tr'));

    expect(items.length).toEqual(2);
  });

  it('contains various columns', () => {
    const headings = fixture.debugElement.queryAll(By.css('th'));
    const hasText = text => headings.some(heading => {
      return heading.nativeElement.textContent === text;
    });
    expect(hasText('Customer')).toBeTruthy();
    expect(hasText('Vendor')).toBeTruthy();
    expect(hasText('Total Price')).toBeTruthy();
  });

  it('formats a date string', () => {
    expect(component.testComponent.formatDate('2018-07-21T11:30:00.123Z')).toEqual('21-07-2018');
    expect(component.testComponent.formatDate(null)).toBeUndefined();
  });

  it('sets sorting', () => {
    const headings = fixture.debugElement.queryAll(By.css('th'));
    const spy = jest.spyOn(service, 'sort');
    headings[0].triggerEventHandler('click', null);
    expect(spy).toBeCalledWith('customer', DataType.STRING);
    headings[1].triggerEventHandler('click', null);
    expect(spy).toBeCalledWith('vendor', DataType.STRING);
    headings[2].triggerEventHandler('click', null);
    expect(spy).toBeCalledWith('headcount', DataType.NUMBER);
    headings[3].triggerEventHandler('click', null);
    expect(spy).toBeCalledWith('deliveredAt', DataType.DATE);
    headings[4].triggerEventHandler('click', null);
    expect(spy).toBeCalledWith('requestedDeliveryDate', DataType.DATE);
    headings[5].triggerEventHandler('click', null);
    expect(spy).toBeCalledWith('paymentType', DataType.STRING);
    headings[6].triggerEventHandler('click', null);
    expect(spy).toBeCalledWith('price.total', DataType.NUMBER);
  });
});
