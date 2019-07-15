import { async, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { OrderService } from './order.service';
import { OrderResponse, DataType } from './models/interfaces';

describe('OrderService', () => {
  let service: OrderService;
  let httpMock: HttpTestingController;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ HttpClientTestingModule ],
      providers: [ OrderService ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    service = TestBed.get(OrderService);
    httpMock = TestBed.get(HttpTestingController);
  });

  it('should create', () => {
    expect(service).toBeTruthy();
  });

  it('should get orders with correct params', () => {
    service.getOrders().subscribe((data: OrderResponse) => {
      expect(data.items[0].vendor).toBe('A vendor');
    });
    const req = httpMock.expectOne(`http://localhost:4300/orders?page=1&sort=requestedDeliveryDate&direction=desc&type=date`);
    expect(req.request.method).toBe('GET');
    req.flush({items: [{vendor: 'A vendor'}]});

    service.sort('vendor', DataType.STRING);

    service.getOrders().subscribe((data: OrderResponse) => {
      expect(data.items[0].vendor).toBe('A vendor');
    });
    const req2 = httpMock.expectOne(`http://localhost:4300/orders?page=1&sort=vendor&direction=desc&type=string`);
    req2.flush({items: [{vendor: 'A vendor'}]});

    // reverse the sort order
    service.sort('vendor', DataType.STRING);

    service.getOrders().subscribe((data: OrderResponse) => {
      expect(data.items[0].vendor).toBe('A vendor');
    });
    const req3 = httpMock.expectOne(`http://localhost:4300/orders?page=1&sort=vendor&direction=asc&type=string`);
    req3.flush({items: [{vendor: 'A vendor'}]});

    httpMock.verify();
  });

  it('sets sorting', () => {
    service.sort('vendor', DataType.STRING);
    service.sorting.subscribe(
      sorting => expect(sorting.field).toEqual('vendor')
    );
  });
});
