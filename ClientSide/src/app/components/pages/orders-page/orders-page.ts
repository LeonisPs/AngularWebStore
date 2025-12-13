import { Component } from '@angular/core';
import { DatePipe } from '@angular/common'
import { OrderService } from '../../../services/order.service';
import { Order } from '../../../shared/models/Order';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-orders-page',
  imports: [DatePipe,RouterLink],
  templateUrl: './orders-page.html',
  styleUrl: './orders-page.scss',
})
export class OrdersPage {

  orders: Order[] = [];

  constructor(private orderService: OrderService) {
    this.orderService.getOrdersByUser().subscribe(orders => {
      this.orders = orders;
    });
  }
}
