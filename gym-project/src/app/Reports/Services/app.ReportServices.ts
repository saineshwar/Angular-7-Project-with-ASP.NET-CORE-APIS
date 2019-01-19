import { Injectable } from "@angular/core";
import { Observable, throwError } from 'rxjs'
import { catchError, tap } from 'rxjs/operators'
import { HttpClient, HttpErrorResponse, HttpHeaders, HttpResponse } from '@angular/common/http';
import { MemberDetailsReportModel } from "../Models/app.MemberDetailsReportViewModel";
import { YearwiseRequestModel } from "../Models/app.YearwiseRequestModel";
import { YearwiseResponseModel } from "../Models/app.YearwiseResponseModel";
import { MonthWiseResponseModel } from "../Models/app.MonthWiseResponseModel";
import { RenewalRequestModel } from "../Models/app.RenewalRequestModel";
import { RenewalReportViewModel } from "../Models/app.RenewalReportViewModel";
import { environment } from "src/app/Shared/environment";

@Injectable({
    providedIn: 'root'
})

export class ReportService {
    private data: any;
    private apiUrl = environment.apiEndpoint + "/api/User/";
    token: any;
    username: any;

    constructor(private http: HttpClient) {
        this.data = JSON.parse(localStorage.getItem('AdminUser'));
        this.token = this.data.token;
    }

    // Get All Member DetailsReport
    public GetAllMemberDetailsReport() {
        var apiUrl = "	http://localhost:49749/api/MemberDetailsReport/";
        let headers = new HttpHeaders({ 'Content-Type': 'application/json' });
        headers = headers.append('Authorization', 'Bearer ' + `${this.token}`);
        return this.http.get<MemberDetailsReportModel[]>(apiUrl, { headers: headers }).pipe(tap(data => data),
            catchError(this.handleError)
        );
    }

    public GetYearWiseReport(year: YearwiseRequestModel) {
        var apiUrl = "	http://localhost:49749/api/YearwiseReport/";
        let headers = new HttpHeaders({ 'Content-Type': 'application/json' });
        headers = headers.append('Authorization', 'Bearer ' + `${this.token}`);
        return this.http.post<YearwiseResponseModel>(apiUrl, year, { headers: headers })
            .pipe(
                catchError(this.handleError)
            );

    }

    public GetMonthWiseReport(year: YearwiseRequestModel) {
        var apiUrl = "	http://localhost:49749/api/MonthwiseReport/";
        let headers = new HttpHeaders({ 'Content-Type': 'application/json' });
        headers = headers.append('Authorization', 'Bearer ' + `${this.token}`);
        return this.http.post<MonthWiseResponseModel>(apiUrl, year, { headers: headers })
            .pipe(
                catchError(this.handleError)
            );

    }
    public GetRenewalReport(year: RenewalRequestModel) {
        var apiUrl = "	http://localhost:49749/api/RenewalReport/";
        let headers = new HttpHeaders({ 'Content-Type': 'application/json' });
        headers = headers.append('Authorization', 'Bearer ' + `${this.token}`);
        return this.http.post<RenewalReportViewModel>(apiUrl, year, { headers: headers })
            .pipe(
                catchError(this.handleError)
            );

    }

    private handleError(error: HttpErrorResponse) 
    {
        let errorMessage = '';
        if (error.error instanceof ErrorEvent) {
            // client-side error
            errorMessage = `Error: ${error.error.message}`;
        } else {
            // server-side error
            errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
        }
        window.alert(errorMessage);
        return throwError(errorMessage);
    }

}
