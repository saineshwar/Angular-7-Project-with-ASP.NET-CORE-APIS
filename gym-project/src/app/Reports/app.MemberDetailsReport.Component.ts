import { Component, ViewChild, ElementRef } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import * as XLSX from 'xlsx';
import { ReportService } from './Services/app.ReportServices';
import { MemberDetailsReportModel } from './Models/app.MemberDetailsReportViewModel';

@Component({
    templateUrl: './app.MemberDetailsReport.html',
    styleUrls: ['../Content/vendor/bootstrap/css/bootstrap.min.css',
        '../Content/vendor/metisMenu/metisMenu.min.css',
        '../Content/dist/css/sb-admin-2.css',
        '../Content/vendor/font-awesome/css/font-awesome.min.css',
        './app.MemberDetailsReport.css'
    ]
})

export class MemberDetailsReportComponent 
{
    private _reportService;
    allMemberDetailsReport :MemberDetailsReportModel[];
    errorMessage: any;
    dataSource: MatTableDataSource<MemberDetailsReportModel>;
    constructor(reportService :ReportService)
    {
        this._reportService = reportService;
    }

    @ViewChild('TABLE') table: ElementRef;
    displayedColumns = ['MemberNo','Name', 'Contactno', 'EmailID', 'PlanName', 'SchemeName', 'JoiningDate', 'RenwalDate', 'PaymentAmount'];
    

    ngOnInit() {

        this._reportService.GetAllMemberDetailsReport().subscribe(
          allrecords => {
            this.allMemberDetailsReport = allrecords
            this.dataSource = new MatTableDataSource(this.allMemberDetailsReport);
       
          },
          error => this.errorMessage = <any>error
        );
    
      }

    ExportTOExcel() 
    {
        const ws: XLSX.WorkSheet = XLSX.utils.table_to_sheet(this.table.nativeElement);
        const wb: XLSX.WorkBook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');
        /* save to file */
        XLSX.writeFile(wb, 'MemberRenewalReport.xlsx');
    }


}


