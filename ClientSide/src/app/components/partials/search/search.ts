import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-search',
  imports: [ButtonModule, InputTextModule, FormsModule],
  templateUrl: './search.html',
  styleUrl: './search.scss',
})
export class Search {
  search='';
  
  constructor(private activatedRoute:ActivatedRoute,private router:Router){}

  ngOnInit(): void {
      this.activatedRoute.params.subscribe((params) => {
        if(params['search']) 
          this.search = params['search'];
      });
  }

  
  searchfunc(term:string):void{
    if(term)
      this.router.navigate(['/search/'+term]);
  }
}
