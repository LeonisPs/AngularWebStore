import { Injectable } from '@angular/core';
import { Item } from '../shared/models/item';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/internal/Observable';
import { ITEMS_BY_ID_URLS, ITEMS_BY_SEARCH_URLS, ITEMS_URLS } from '../shared/constants/urls';

@Injectable({
  providedIn: 'root',
})
export class ItemService {

  constructor(private http:HttpClient){}
  
  getAll(): Observable<Item[]>{
    return this.http.get<Item[]>(ITEMS_URLS);
  }

  getAllBySearch(search:string){
    return this.http.get<Item[]>(ITEMS_BY_SEARCH_URLS+search);
  }

  getItemById(itemId:string):Observable<Item>{
    return this.http.get<Item>(ITEMS_BY_ID_URLS+itemId);
  }
}
