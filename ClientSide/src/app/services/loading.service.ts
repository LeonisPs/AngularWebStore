import { Injectable,NgZone  } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class LoadingService {
  private isLoadingSubject = new BehaviorSubject<boolean>(false);
  constructor(private zone: NgZone) {}

  showLoading(){
    this.zone.run(() => {
      this.isLoadingSubject.next(true);
    });
  }
  
  hideLoading(){
    this.zone.run(() => {
      this.isLoadingSubject.next(false);
    });
  }

  get isLoading(){
    return this.isLoadingSubject.asObservable();
  }
}
