import { HttpInterceptorFn, HttpEventType } from '@angular/common/http';
import { inject } from '@angular/core';
import { finalize, tap } from 'rxjs';
import { LoadingService } from '../../services/loading.service';

let pendingRequests = 0;

export const loadingInterceptor: HttpInterceptorFn = (req, next) => {
  const loadingService = inject(LoadingService);

  pendingRequests++;
  loadingService.showLoading();

  return next(req).pipe(
    finalize(() => {
      pendingRequests--;
      if (pendingRequests === 0) {
        loadingService.hideLoading();
      }
    })
  );
};

