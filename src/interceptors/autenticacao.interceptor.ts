import { AthorizationService } from './../providers/notifier/authorization.provider';
import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';

import { Observable } from 'rxjs/Rx';

@Injectable()
export class MyHttpInterceptor implements HttpInterceptor {

  constructor(
    private athorizationService: AthorizationService
  ) {}

  public intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    
    // request = request.clone({
    //   setHeaders: {
    //     Authorization: `Bearer ${this.auth.getToken()}`
    //   }
    // });

    return next.handle(request).do(
      // Sucesso em requição
      () => {
      //  console.log('Deu bom');
      },

      // Erro em requisição
      (err) => {

        // Caso o erro for unathorizated (não está autorizado - 401)
        // ou o forbiden (não é permitido - 403)
        if (err.status === 401 || err.status === 403) {
          // Chama o serviço que está controlado quem quer saber dessa informação (unathorizated)
          this.athorizationService.notifyUnathorizated();
        }
    });
  }
}