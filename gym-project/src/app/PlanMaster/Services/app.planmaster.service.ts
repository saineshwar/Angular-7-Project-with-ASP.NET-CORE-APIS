import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs'
import { catchError, tap } from 'rxjs/operators'
import { HttpClient, HttpErrorResponse, HttpHeaders, HttpResponse } from '@angular/common/http';
import { PlanMasterModel } from '../Models/app.PlanMasterModel';
import { PlanMasterViewModel } from '../Models/app.PlanMasterViewModel';
import { ActivePlanModel } from '../Models/app.ActivePlanModel';
// import { environment } from 'src/app/Shared/environment';
import{environment} from '../../../environments/environment';


@Injectable({
    providedIn: 'root'
})

export class PlanService
{
    private data: any;
    private apiUrl = environment.apiEndpoint + "/api/PlanMaster/";
    token: any;
    username: any;


    constructor(private http: HttpClient) {
        this.data = JSON.parse(localStorage.getItem('AdminUser'));
        this.token = this.data.token;
    }

    // Save Plan
    public SavePlan(planMasterModel: PlanMasterModel) {
        let headers = new HttpHeaders({ 'Content-Type': 'application/json' });
        headers = headers.append('Authorization', 'Bearer ' + `${this.token}`);
        return this.http.post<any>(this.apiUrl, planMasterModel, { headers: headers })
            .pipe(
                catchError(this.handleError)
            );

    }

    public GetAmount(planID: string, schemeId: string)
    {
        var apiUrl = environment.apiEndpoint + "/api/GetTotalAmount/";
        let AmountRequest = { "PlanId": planID,"SchemeId":schemeId};

        let headers = new HttpHeaders({ 'Content-Type': 'application/json' });
        headers = headers.append('Authorization', 'Bearer ' + `${this.token}`);
        return this.http.post<string>(apiUrl, AmountRequest, { headers: headers })
            .pipe(
                catchError(this.handleError)
            );
    }



    // Get All Plans
    public GetAllPlans() {
        let headers = new HttpHeaders({ 'Content-Type': 'application/json' });
        headers = headers.append('Authorization', 'Bearer ' + `${this.token}`);
        return this.http.get<PlanMasterViewModel[]>(this.apiUrl, { headers: headers }).pipe(tap(data => data),
            catchError(this.handleError)
        );
    }

    // Get All Plans
    public GetAllActivePlans(schemeId) {
        var apiUrl = environment.apiEndpoint + "/api/AllActivePlanMaster" + '/' + schemeId;;
        let headers = new HttpHeaders({ 'Content-Type': 'application/json' });
        headers = headers.append('Authorization', 'Bearer ' + `${this.token}`);
        return this.http.get<ActivePlanModel[]>(apiUrl, { headers: headers }).pipe(tap(data => data),
            catchError(this.handleError)
        );
    }


    // Get All Plans by PlanId
    public GetPlanByPlanID(planId) {
        var editurl = this.apiUrl + planId;
        let headers = new HttpHeaders({ 'Content-Type': 'application/json' });
        headers = headers.append('Authorization', 'Bearer ' + `${this.token}`);
        return this.http.get<PlanMasterViewModel[]>(editurl, { headers: headers }).pipe(tap(data => data),
            catchError(this.handleError)
        );
    }


    // Update Plan
    public UpdatePlan(planMasterModel: PlanMasterModel) {
        var updateurl = this.apiUrl + planMasterModel.PlanID;
        let headers = new HttpHeaders({ 'Content-Type': 'application/json' });
        headers = headers.append('Authorization', 'Bearer ' + `${this.token}`);
        return this.http.put<any>(updateurl, planMasterModel, { headers: headers })
            .pipe(
                catchError(this.handleError)
            );
    }

    public DeletePlan(planId) {
        var deleteUrl = this.apiUrl + '/' + planId;
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
