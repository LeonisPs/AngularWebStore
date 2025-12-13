import { Component, Input, OnInit } from '@angular/core';
import { Order } from '../../../shared/models/Order';
import { RouterLink } from "@angular/router";
import { CurrencyPipe } from "@angular/common";

@Component({
  selector: 'order-items-list',
  imports: [RouterLink,CurrencyPipe],
  templateUrl: './order-items-list.html',
  styleUrl: './order-items-list.scss',
})
export class OrderItemsList implements OnInit {
  @Input()
  order!:Order;
  constructor(){
  }
  ngOnInit(): void{}
}
