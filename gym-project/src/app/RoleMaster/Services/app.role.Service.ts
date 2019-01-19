import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs'
import { catchError, tap } from 'rxjs/operators'
import { HttpClient, HttpErrorResponse, HttpHeaders, HttpResponse } from '@angular/common/http';
import { RoleModel } from '../Models/app.RoleModel';
import { environment } from 'src/app/Shared/environment';
@Injectable({
    providedIn: 'root'
})

export class RoleService {

    private data: any;
    private apiUrl = environment.apiEndpoint + "/api/CreateRole/";
    token: any;
    username: any;
    
    constructor(private http: HttpClient) {
        this.data = JSON.parse(localStorage.getItem('AdminUser'));
        this.token = this.data.token;
    }

    public AddRole(rolemodel: RoleModel) {
        let headers = new HttpHeaders({ 'Content-Type': 'application/json' });
        headers = headers.append('Authorization', 'Bearer ' + `${this.token}`);
        return this.http.post<any>(this.apiUrl, rolemodel, { headers: headers })
            .pipe(
                catchError(this.handleError)
            );
    }

    // Get All Role
    public GetAllRole() {
        let headers = new HttpHeaders({ 'Content-Type': 'application/json' });
        headers = headers.append('Authorization', 'Bearer ' + `${this.token}`);
        return this.http.get<RoleModel[]>(this.apiUrl, { headers: headers }).pipe(tap(data => data),
            catchError(this.handleError)
        );
    }

    // Get All Role By ID
    public GetRoleById(RoleId) {
        var editUrl = this.apiUrl + '/' + RoleId;
        let headers = new HttpHeaders({ 'Content-Type': 'application/json' });
        headers = headers.append('Authorization', 'Bearer ' + `${this.token}`);
        return this.http.get<RoleModel>(editUrl, { headers: headers }).pipe(tap(data => data),
            catchError(this.handleError)
        );
    }

    // Update Role
    public UpdateRole(rolemodel: RoleModel) {
        var putUrl = this.apiUrl + '/' + rolemodel.RoleId;
        let headers = new HttpHeaders({ 'Content-Type': 'application/json' });
        headers = headers.append('Authorization', 'Bearer ' + `${this.token}`);
        return this.http.put<any>(putUrl, rolemodel, { headers: headers })
            .pipe(
                catchError(this.handleError)
            );
    }

    public DeleteRole(RoleId) {
        var deleteUrl = this.apiUrl + '/' + RoleId;
        let headers = new HttpHeaders({ 'Content-Type': 'application/json' });
        headers = headers.append('Authorization', 'Bearer ' + `${this.token}`);
        return this.http.delete<any>(deleteUrl, { headers: headers })
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