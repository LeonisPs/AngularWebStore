import { Component } from '@angular/core';
import { LoadingService } from '../../../services/loading.service';
import { Observable } from 'rxjs';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'app-loading',
  imports: [AsyncPipe],
  templateUrl: './loading.html',
  styleUrl: './loading.scss',
})
export class Loading {
  isLoading$!: Observable<boolean>;
  constructor(loadingService: LoadingService){
    this.isLoading$ = loadingService.isLoading;
  }
}
