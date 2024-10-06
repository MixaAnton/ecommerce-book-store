import { HttpInterceptorFn } from '@angular/common/http';

export const authInterceptor: HttpInterceptorFn = (req, next) => {

  const token = localStorage.getItem('accessToken');
  if (token) {
    const authReq = req.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`,
        // 'Accept': '*',
        // 'Content-Type': 'application/json'
      }
    });
    return next(authReq);
  }
  return next(req);
};
