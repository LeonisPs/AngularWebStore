import { Component } from '@angular/core';
import { Order } from '../../../shared/models/Order';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CartService } from '../../../services/cart.service';
import { UserService } from '../../../services/user.service';
import { ToastrService } from 'ngx-toastr';
import { InputTextModule } from 'primeng/inputtext';
import { PasswordModule } from 'primeng/password';
import { MessageModule } from 'primeng/message';
import { MessageService } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { FloatLabel } from 'primeng/floatlabel';
import { OrderItemsList } from "../../partials/order-items-list/order-items-list";
import { InputNumber } from "primeng/inputnumber";
import { OrderService } from '../../../services/order.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-checkout-page',
  imports: [
    ReactiveFormsModule,
    InputTextModule,
    PasswordModule,
    MessageModule,
    ButtonModule,
    FloatLabel,
    OrderItemsList,
    InputNumber
],
  templateUrl: './checkout-page.html',
  styleUrl: './checkout-page.scss',
})
export class CheckoutPage {
  order:Order = new Order;
  checkoutForm!: FormGroup;
  constructor(
    cartService:CartService,
    private formBuilder:FormBuilder,
    private userService:UserService,
    private toastrService: ToastrService,
    private orderService: OrderService,
    private router: Router
  ){
    const cart = cartService.getCart();
    this.order.items = cart.items;
    this.order.totalPrice = cart.totalPrice;
  }

  ngOnInit(): void{
    let {name,address} = this.userService.currentUser;
    this.checkoutForm = this.formBuilder.group({
      name:[name, Validators.required],
      address:[address,Validators.required],
      lastName:['',Validators.required],
      phoneNumber:[],
    });
  }

  get fc(){
    return this.checkoutForm.controls;
  }

  createOrder(){
    if(this.checkoutForm.invalid){
      this.toastrService.warning('Please fill the inputs','Invalid Inputs')
      return;
    }

    this.order.name = this.fc["name"].value;
    this.order.address = this.fc["address"].value;
    this.order.lastname = this.fc["lastName"].value;
    this.order.phoneNumber = this.fc["phoneNumber"].value;

    this.orderService.create(this.order).subscribe({
      next: () => {
        this.router.navigateByUrl('/payment');
      },
      error:(errorResponse) => {
        this.toastrService.error(errorResponse.error, 'Cart');
      }
    })
  }
  
  isInvalid(controlName: string) {
    const control = this.fc[controlName];
    return control?.invalid && control.touched;
  }
}
