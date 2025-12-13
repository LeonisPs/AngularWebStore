import { Component, OnInit } from '@angular/core';
import { Item } from '../../../shared/models/item';
import { ItemService } from '../../../services/item.service';
import { ActivatedRoute, Route, Router } from '@angular/router';
import {CurrencyPipe} from '@angular/common';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { CartService } from '../../../services/cart.service';
import { NotFound } from "../../partials/not-found/not-found";
import { Observable } from 'rxjs/internal/Observable';


@Component({
  selector: 'app-item-page',
  imports: [
    CurrencyPipe,
    ButtonModule,
    CardModule,
    NotFound
],
  templateUrl: './item-page.html',
  styleUrl: './item-page.scss',
})
export class ItemPage implements OnInit{
  item!: Item;
  constructor(activatedRoute:ActivatedRoute, itemService:ItemService,
    private cartService:CartService,private router: Router){
    activatedRoute.params.subscribe((params) => {
      if(params['id']) 
        itemService.getItemById(params['id']).subscribe(serverItem =>{
          this.item = serverItem;
        });
    });
  }

  ngOnInit(): void {
    
  }

  addToCart(){
    this.cartService.addToCart(this.item);
  }

}

