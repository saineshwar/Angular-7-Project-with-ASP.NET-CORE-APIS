import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs'
import { catchError, tap } from 'rxjs/operators'
import { HttpClient, HttpErrorResponse, HttpHeaders, HttpResponse } from '@angular/common/http';
import { MemberRegistrationModel } from '../Models/app.memberRegistrationModel';
import { MemberRegistrationGridModel } from '../Models/app.MemberRegistrationGridModel';
import { PaginationService } from '../../Shared/PaginationService';
import { constantUrl } from '../../Shared/constantUrl';
import { SchemeDropdownModel } from '../../SchemeMasters/Models/app.SchemeDropdownModel';
import { ActivePlanModel } from '../../PlanMaster/Models/app.ActivePlanModel';

@Injectable({
    providedIn: 'root'
})

export class MemberRegistrationService {
    private data: any;
    private apiUrl = constantUrl.apiEndpoint + "/api/RegisterMember/";

    token: any;
    username: any;

    constructor(private http: HttpClient, private paginationService: PaginationService) {
        this.data = JSON.parse(localStorage.getItem('currentUser'));
        this.token = this.data.token;
        this.username = this.data.username;
    }

    getAll<T>() {
        let headers = new HttpHeaders({ 'Content-Type': 'application/json' });
        headers = headers.append('Authorization', 'Bearer ' + `${this.token}`);
        let Url = constantUrl.apiEndpoint + "/api/RegisterMember";
        const mergedUrl = `${Url}` +
            `?page=${this.paginationService.page}&pageCount=${this.paginationService.pageCount}`;

        return this.http.get<T>(mergedUrl, { headers: headers, observe: 'response' }).pipe(
            catchError(this.handleError)
        );
    }

    // Save Member
    public SaveMember(memberModel: MemberRegistrationModel) 
    {
        var SaveUrl = constantUrl.apiEndpoint +"/api/RegisterMember";
        let headers = new HttpHeaders({ 'Content-Type': 'application/json' });
        headers = headers.append('Authorization', 'Bearer ' + `${this.token}`);
        return this.http.post<any>(SaveUrl, memberModel, { headers: headers })
            .pipe(
                catchError(this.handleError)
            );
    }


    // Update Member
    public UpdateMember(memberModel: MemberRegistrationModel) {
        var updateUrl = constantUrl.apiEndpoint +"/api/RegisterMember/" + memberModel.MemberId;
        let headers = new HttpHeaders({ 'Content-Type': 'application/json' });
        headers = headers.append('Authorization', 'Bearer ' + `${this.token}`);
        return this.http.put<any>(updateUrl, memberModel, { headers: headers })
            .pipe(
                catchError(this.handleError)
            );
    }

    // Get All Member
    public GetAllMember() 
    {
        var getUrl = constantUrl.apiEndpoint +"/api/RegisterMember";
        let headers = new HttpHeaders({ 'Content-Type': 'application/json' });
        headers = headers.append('Authorization', 'Bearer ' + `${this.token}`);
        return this.http.get<MemberRegistrationGridModel[]>(this.apiUrl, { headers: headers }).pipe(tap(data => data),
            catchError(this.handleError)
        );
    }
    // Get Member by MemberID

    public GetMemberById(MemberId) {
        console.log(MemberId); 
        var editUrl = constantUrl.apiEndpoint +"/api/RegisterMember"+ '/' + MemberId;
        let headers = new HttpHeaders({ 'Content-Type': 'application/json' });
        headers = headers.append('Authorization', 'Bearer ' + `${this.token}`);
        return this.http.get<MemberRegistrationModel>(editUrl, { headers: headers }).pipe(tap(data => data),
            catchError(this.handleError)
        );
    }

    public DeleteMember(MemberId) {
        var deleteUrl = constantUrl.apiEndpoint +"/api/RegisterMember"+ '/' + MemberId;
        let headers = new HttpHeaders({ 'Content-Type': 'application/json' });
        headers = headers.append('Authorization', 'Bearer ' + `${this.token}`);
        return this.http.delete<any>(deleteUrl, { headers: headers })
            .pipe(
                catchError(this.handleError)
            );
    }

    public GetAllActiveSchemeList() {
        var url = constantUrl.apiEndpoint + "/api/SchemeDropdown/";
        let headers = new HttpHeaders({ 'Content-Type': 'application/json' });
        headers = headers.append('Authorization', 'Bearer ' + `${this.token}`);
        return this.http.get<SchemeDropdownModel[]>(url, { headers: headers }).pipe(tap(data => data),
            catchError(this.handleError)

        );
    }

    public GetAllActivePlans(schemeId) {
        var url = constantUrl.apiEndpoint + "/api/AllActivePlanMaster" + '/' + schemeId;;
        let headers = new HttpHeaders({ 'Content-Type': 'application/json' });
        headers = headers.append('Authorization', 'Bearer ' + `${this.token}`);
        return this.http.get<ActivePlanModel[]>(url, { headers: headers }).pipe(tap(data => data),
            catchError(this.handleError)
        );
    }

    public GetAmount(planID: string, schemeId: string) {
        var url = constantUrl.apiEndpoint + "/api/GetTotalAmount/";
        let AmountRequest = { "PlanId": planID, "SchemeId": schemeId };

        let headers = new HttpHeaders({ 'Content-Type': 'application/json' });
        headers = headers.append('Authorization', 'Bearer ' + `${this.token}`);
        return this.http.post<string>(url, AmountRequest, { headers: headers })
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