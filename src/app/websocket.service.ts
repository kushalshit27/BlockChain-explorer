import { BlockchainResponse } from './blockchain-response';
import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { catchError, tap, map } from 'rxjs/operators';
const blockUrl = 'http://172.18.1.0:22000';

@Injectable({
  providedIn: 'root'
})
export class WebsocketService {

  constructor(private httpClient: HttpClient) { }

  // getBlocks (): Observable<any[]> {
  //   return this.httpClient.post<any[]>(blockUrl,{"method": "eth_blockNumber", "params": [], "id":1})
  //     .pipe(
  //       tap(heroes => console.log('fetched blocks')),
  //       catchError(this.handleError('getBlocks', []))
  //     );
  // }

  getBlocks (loginPayload): Observable<BlockchainResponse> {
      return this.httpClient.post<BlockchainResponse>(blockUrl, loginPayload)
                            .pipe(catchError(val => of(val)));
      }

  private handleError<T> (operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead
      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }
}
