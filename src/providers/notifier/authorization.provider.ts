import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Rx';
import { Injectable } from '@angular/core';

@Injectable()
export class AthorizationService {

    private listerner = new Subject<void>();

    public notifyUnathorizated(): void {
        this.listerner.next();
    }

    public listen(): Observable<void> {
        return this.listerner.asObservable();
    }

}