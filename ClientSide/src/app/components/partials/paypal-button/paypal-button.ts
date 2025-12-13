import { Component, ElementRef, Input, ViewChild } from '@angular/core';
import { Order } from '../../../shared/models/Order';
import { OrderService } from '../../../services/order.service';
import { CartService } from '../../../services/cart.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

declare var paypal: any;

@Component({
  selector: 'app-paypal-button',
  imports: [],
  templateUrl: './paypal-button.html',
  styleUrl: './paypal-button.scss',
})
export class PaypalButton {
  @Input()
  order!:Order;

  @ViewChild('paypal',{static: true})
  paypalElement!: ElementRef;

  constructor(
    private orderService: OrderService,
    private cartService: CartService,
    private router: Router,
    private toastrService: ToastrService,
  ) {}
  ngOnInit():void {
    const self = this;
    paypal.Buttons({
      createOrder:(data:any, actions: any) => {
        if (!self.order || !self.order.totalPrice) {
          this.toastrService.error('Order total is invalid.');
          throw new Error('Order total is missing');
        }
        return actions.order.create({
          purchase_units: [
            {
              amount: {
                currency_code: 'USD',
                value: self.order.totalPrice.toFixed(2),
              },
            },
          ],
        });
      },

      onApprove: async (data:any, actions: any) => {
        const payment = await actions.order.capture();
        this.order.paymentId = payment.id;
        self.orderService.pay(this.order).subscribe(
          {
            next: (orderId) => {
              this.cartService.clearCart();
              this.router.navigateByUrl('/track/'+orderId);
              this.toastrService.success(
                'Payment Successfull'
              );
            },
            error: (error) =>{
              this.toastrService.error(
                'Payment Failed'
              )
            }
          }
        );
      },

      onError: (err: any) => {
        this.toastrService.error('Payment Failed');
        console.log(err);
      },
    })
    .render(this.paypalElement.nativeElement);
  }
}
