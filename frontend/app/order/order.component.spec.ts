import { Component, Input, Output, EventEmitter } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OrderComponent } from './order.component';
import { OrderService } from './order.service';
import { Order, Sorting } from './models/interfaces';
import { of } from 'rxjs/observable/of';

const mockOrders = [
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
    lateReason: null,
    packaging: 'VENDOR_PROVIDED',
    driverName: 'Nelson Piquet',
    deliveryLocation: {
        lat: 51.506497,
        long: -0.044610999999999984
    },
    currentLocation: {
        lat: 51.513181,
        long: -0.01464299999999999
    },
    vendorLocation: {
        lat: 51.48927200000001,
        long: -0.12503999999999998
    }
  }
];
@Component({
  selector: 'app-order-list',
  template: '<p>Mock Order List</p>'
})
class MockOrderListsComponent {
  @Input() orders: Order[];
  @Input() sorting: Sorting;
}
@Component({
  selector: 'app-pagination',
  template: '<p>Mock Pagination Component</p>'
})
class MockPaginationComponent {
  @Input() totalItems: number;
  @Input() pageSize = 100;
  @Input() currentPage = 1;
  @Input() currentPageItems: number;
  @Output() gotoPage: EventEmitter<number> = new EventEmitter();
}

class MockOrderService {
  sorting = of({});
  getOrders(page) {
    return of(mockOrders);
  }
}

describe('OrderComponent', () => {
  let component: OrderComponent;
  let fixture: ComponentFixture<OrderComponent>;
  let service: OrderService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OrderComponent, MockOrderListsComponent, MockPaginationComponent ],
      providers: [{
        provide: OrderService,
        useClass: MockOrderService,
      }]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OrderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    service = TestBed.get(OrderService);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should get pages of data', () => {
    const spy = jest.spyOn(service, 'getOrders');
    component.getPage(2);
    fixture.detectChanges();
    expect(spy).toBeCalledWith(2);
  });
});
