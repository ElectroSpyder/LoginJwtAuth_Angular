import { TokenStorageService } from './../app/_services/token-storage.service';
import { HTTP_INTERCEPTORS, HttpEvent, HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {HttpInterceptor, HttpHandler, HttpRequest} from '@angular/common/http';
import { Observable } from 'rxjs';

const TOKEN_HEADER_KEY = 'Authorization';
@Injectable()
export class AuthInterceptor implements HttpInterceptor{
    
    constructor(private token: TokenStorageService) { }

    // toma un objeto HTTPRequest, cambia y envia 
    //el metodo handle() del objeto HttpHandle
    //transforma el objeto HttpRequest en un observable
    // next representa el proximo interceptor
    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        let authReq = req;
        const token = this.token.getToken();

        if(token!= null){
            authReq = req.clone({headers : req.headers.set(TOKEN_HEADER_KEY, 'Bearer ' + token)});
        }

        return next.handle(authReq);
    }  
}

export const authInterceptorProviders = [
    {provide : HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true}
];