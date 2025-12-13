import { Component } from '@angular/core';
import { Cart } from '../../../shared/models/Carts';
import { CartService } from '../../../services/cart.service';
import { CartItems } from '../../../shared/models/CartItems';
import { DataViewModule } from 'primeng/dataview';
import { ButtonModule } from 'primeng/button';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { InputNumberModule  } from 'primeng/inputnumber';
import { RouterLink } from "@angular/router";
import { NotFound } from "../../partials/not-found/not-found";

@Component({
  selector: 'app-cart-page',
  imports: [
    DataViewModule,
    ButtonModule,
    CommonModule,
    FormsModule,
    InputNumberModule,
    RouterLink,
    NotFound
],
  templateUrl: './cart-page.html',
  styleUrl: './cart-page.scss',
})
export class CartPage {
  cart!: Cart
  constructor(private cartService: CartService){
    this.cartService.gerCartObservable().subscribe((cart) =>{
      this.cart = cart;
    })
  }
  removeFromCart(cartItem:CartItems){
    this.cartService.removeFromCart(cartItem.item.id);
  }
  changeQuantity(cartItem:CartItems,quantityInString:string){
    const quantity = parseInt(quantityInString);
    this.cartService.changeQuantity(cartItem.item.id,quantity);
  }
}
