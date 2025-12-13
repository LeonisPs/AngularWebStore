import { Component } from '@angular/core';
import { Order } from '../../../shared/models/Order';
import { OrderService } from '../../../services/order.service';
import { Router } from '@angular/router';
import { OrderItemsList } from "../../partials/order-items-list/order-items-list";
import { PaypalButton } from "../../partials/paypal-button/paypal-button";

@Component({
  selector: 'app-payment-page',
  imports: [OrderItemsList, PaypalButton],
  templateUrl: './payment-page.html',
  styleUrl: './payment-page.scss',
})
export class PaymentPage {
  order:Order = new Order();
  constructor(orderService: OrderService,router: Router){
    orderService.getNewOrderForCurrentUser().subscribe({
      next:(order)=>{
        this.order = order;
      },
      error:(err) => {
        router.navigateByUrl('/checkout');
      }
    })
  }
}
