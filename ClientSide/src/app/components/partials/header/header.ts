import { Component,OnInit } from '@angular/core';
import { RouterLink } from "@angular/router";
import { Search } from "../search/search";
import { MenubarModule } from 'primeng/menubar';
import { MenuItem } from 'primeng/api';
import { BadgeModule } from 'primeng/badge';
import { AvatarModule } from 'primeng/avatar';
import { InputTextModule } from 'primeng/inputtext';
import { CommonModule } from '@angular/common';
import { CartService } from '../../../services/cart.service';
import { ToggleSwitchModule } from 'primeng/toggleswitch';
import { UserService } from '../../../services/user.service';
import { User } from '../../../shared/models/User';

@Component({
  selector: 'app-header',
  imports: [MenubarModule, CommonModule, BadgeModule, AvatarModule, InputTextModule, RouterLink, Search, ToggleSwitchModule],
  templateUrl: './header.html',
  styleUrl: './header.scss',
})
export class Header {
  items: MenuItem[] | undefined;
  cartQuantity!: number;
  user!:User;
  checked: boolean = false;
  constructor(
    cartService:CartService,
    private userService:UserService,
  ){
    
      this.cartQuantity=0;
      cartService.gerCartObservable().subscribe((newCart) => this.cartQuantity = newCart.totalCount)
      userService.userObservable.subscribe((newUser) =>{
        this.user = newUser;
      });

      this.items = [
        {
          label: 'Login',
          icon: 'pi pi-sign-in',
          routerLink:'/login',
          visible: !this.user.token,
        },
        {
          label: 'Cart',
          icon: 'pi pi-shopping-cart',
          routerLink:'/cart-page',
          badge: this.cartQuantity > 0 ? String(this.cartQuantity) : undefined,
        },
        {
          
          label: this.user.token? this.user.name : 'User',
          icon: 'pi pi-briefcase',
          routerLink:'/User',
          visible: !!this.user.token,
          items: [
            {
              label: 'Orders',
              icon: 'pi pi-shopping-bag',
              routerLink:'/track',
            },
            {
              separator: true,
            },
            {
              label: 'Logout',
              icon: 'pi pi-sign-out',
              command: () =>{ this.logout();}
            },
          ]
        },
      ];
    
  }
  
  toggleDarkMode() {
    const element = document.querySelector('html');
    if (!element) {
      return;
    }
    element.classList.toggle('my-app-dark');
  }

  logout(){
    this.userService.logout();
  }

}
