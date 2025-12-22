import { ChangeDetectorRef, Component,NgZone  } from '@angular/core';
import { Item } from '../../../shared/models/item';
import { ItemService } from '../../../services/item.service';
import { ActivatedRoute, RouterLink } from "@angular/router";
import {AsyncPipe, CurrencyPipe} from '@angular/common';
import { CardModule } from 'primeng/card';
import { NotFound } from "../../partials/not-found/not-found";
import { Observable, switchMap } from 'rxjs';


@Component({
  selector: 'app-home',
  imports: [
    RouterLink,
    CurrencyPipe,
    CardModule,
    NotFound,
    AsyncPipe
],
  templateUrl: './home.html',
  styleUrl: './home.scss',
})
export class Home {
  items$!: Observable<Item[]>;

  constructor(private itemService:ItemService,private cdr: ChangeDetectorRef,private activatedRoute:ActivatedRoute){
  };
  
  ngOnInit():void{
     this.items$ =this.activatedRoute.params
      .pipe(
        switchMap(params => {
          if (params['search']) {
            return this.itemService.getAllBySearch(params['search']);
          }
          return this.itemService.getAll();
        })
      );
  }
}
