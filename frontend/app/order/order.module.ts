import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OrderService } from './order.service';
import { OrderListComponent } from './order-list/order-list.component';
import { OrderComponent } from './order.component';
import { AppRouterModule } from '../app.router';
import { SharedModule } from '../shared/shared.module';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  imports: [
    CommonModule,
    AppRouterModule,
    HttpClientModule,
    SharedModule,
  ],
  providers: [
    OrderService
  ],
  declarations: [
    OrderListComponent,
    OrderComponent,
  ]
})
export class OrderModule { }
