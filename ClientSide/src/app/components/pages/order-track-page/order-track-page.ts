import { Component } from '@angular/core';
import { DatePipe } from '@angular/common';
import { Order } from '../../../shared/models/Order';
import { ActivatedRoute } from '@angular/router';
import { OrderService } from '../../../services/order.service';
import { OrderItemsList } from "../../partials/order-items-list/order-items-list";

@Component({
  selector: 'app-order-track-page',
  imports: [DatePipe, OrderItemsList],
  templateUrl: './order-track-page.html',
  styleUrl: './order-track-page.scss',
})
export class OrderTrackPage {
  order!: Order;
  constructor(activatedRoute: ActivatedRoute, orderService: OrderService) {
    const params = activatedRoute.snapshot.params;
    if(!params['orderId']) return;

    orderService.trackOrderById(params['orderId']).subscribe(order => {
      this.order = order;
    })
  }
}
