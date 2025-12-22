import { Component } from '@angular/core';
import { DatePipe, AsyncPipe } from '@angular/common';
import { Order } from '../../../shared/models/Order';
import { ActivatedRoute } from '@angular/router';
import { OrderService } from '../../../services/order.service';
import { OrderItemsList } from "../../partials/order-items-list/order-items-list";
import { Observable } from 'rxjs';

@Component({
  selector: 'app-order-track-page',
  imports: [DatePipe, AsyncPipe, OrderItemsList],
  templateUrl: './order-track-page.html',
  styleUrl: './order-track-page.scss',
})
export class OrderTrackPage {
  order$!: Observable<Order>;
  constructor(activatedRoute: ActivatedRoute, orderService: OrderService) {
    const params = activatedRoute.snapshot.params;
    if(!params['orderId']) return;

    this.order$ = orderService.trackOrderById(params['orderId']);
  }
}
