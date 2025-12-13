import { Component } from '@angular/core';
import { LoadingService } from '../../../services/loading.service';

@Component({
  selector: 'app-loading',
  imports: [],
  templateUrl: './loading.html',
  styleUrl: './loading.scss',
})
export class Loading {
  isLoading!: boolean;
  constructor(loadingService: LoadingService){
    loadingService.isLoading.subscribe((isLoading) => {
      this.isLoading = isLoading;
    })
  }
}
