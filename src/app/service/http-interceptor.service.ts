import { HttpEvent, HttpHandler, HttpHeaders, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthenticationService } from './authentication.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HttpInterceptorService implements HttpInterceptor {

  constructor(private authService: AuthenticationService) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (this.authService.signedIn) {
      const authReq = req.clone({
        headers: new HttpHeaders({
          Authorization: this.authService.createBasicAuth(),
        }),
        withCredentials: true
      });
      return next.handle(authReq);
    } else {
      return next.handle(req);
    }
  }

}
