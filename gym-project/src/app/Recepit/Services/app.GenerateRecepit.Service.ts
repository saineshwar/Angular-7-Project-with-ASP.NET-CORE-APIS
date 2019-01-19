import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs'
import { catchError, tap } from 'rxjs/operators'
import { HttpClient, HttpErrorResponse, HttpHeaders, HttpResponse } from '@angular/common/http';
import { PaginationService } from '../../Shared/PaginationService';
import { constantUrl } from '../../Shared/constantUrl';
import { GenerateRecepitRequestModel } from '../Models/app.GenerateRecepitRequestModel';
import { GenerateRecepitViewModel } from '../Models/app.GenerateRecepitViewModel';

@Injectable({
    providedIn: 'root'
})

export class GenerateRecepit {

    private data: any;
    private apiUrl = constantUrl.apiEndpoint + "/api/Payment/";
    token: any;
    username: any;

    constructor(private http: HttpClient, private paginationService: PaginationService) {
        this.data = JSON.parse(localStorage.getItem('currentUser'));
        this.token = this.data.token;
        this.username = this.data.username
    }

  
    public GetRecepitDetails(memberModel: GenerateRecepitRequestModel) 
    {
        var SaveUrl = constantUrl.apiEndpoint +"/api/GenerateRecepit";
        let headers = new HttpHeaders({ 'Content-Type': 'application/json' });
        headers = headers.append('Authorization', 'Bearer ' + `${this.token}`);
        return this.http.post<GenerateRecepitViewModel>(SaveUrl, memberModel, { headers: headers })
            .pipe(
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
