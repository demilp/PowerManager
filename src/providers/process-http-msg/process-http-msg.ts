import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable()
export class ProcessHttpMsgProvider {

  constructor() {
    console.log('Hello ProcessHttpMsgProvider Provider');
  }
  public handleError(error: HttpErrorResponse | any) {
    let errMsg: string;

    if (error.error instanceof Error) {
      errMsg = error.error.message;
    } else {
      errMsg = `${error.status} - ${error.statusText || ''} ${error.error}`;
    }
    return Observable.throw(errMsg);
  }

}
