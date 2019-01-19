import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs'
import { catchError, tap } from 'rxjs/operators'
import { PeriodModel } from '../Models/app.PeriodModel';
import { HttpClient, HttpErrorResponse, HttpHeaders, HttpResponse } from '@angular/common/http';

@Injectable({
    providedIn: 'root'
})

export class PeriodService 
{
    private apiUrl = "	http://localhost:49749/api/Period/";
    private data: any;
    token: any;
    username: any;

    constructor(private http: HttpClient) {
        
       
    }

    public GetAllPeriod() 
    {
        let headers = new HttpHeaders({ 'Content-Type': 'application/json' });
        return this.http.get<PeriodModel[]>(this.apiUrl, { headers: headers })
            .pipe(tap(data => data),
                catchError(this.handleError)
            );
    }

    private handleError(error: HttpErrorResponse) {
        if (error.error instanceof ErrorEvent) {
            // A client-side or network error occurred. Handle it accordingly.
            console.error('An error occurred:', error.error.message);
        } else {
            // The backend returned an unsuccessful response code.
            // The response body may contain clues as to what went wrong,
            console.error(`Backend returned code ${error.status}, ` + `body was: ${error.error}`);
        }
        // return an observable with a user-facing error message
        return throwError('Something bad happened; please try again later.');
    };


}