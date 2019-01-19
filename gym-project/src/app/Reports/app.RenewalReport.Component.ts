import { OnInit, Component, ViewChild, ElementRef } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import * as XLSX from 'xlsx';
import { ReportService } from './Services/app.ReportServices';
import { RenewalReportViewModel } from './Models/app.RenewalReportViewModel';
import { RenewalRequestModel } from './Models/app.RenewalRequestModel';

@Component({
    templateUrl: './app.RenewalReport.html',
    styleUrls: ['../Content/vendor/bootstrap/css/bootstrap.min.css',
        '../Content/vendor/metisMenu/metisMenu.min.css',
        '../Content/dist/css/sb-admin-2.css',
        '../Content/vendor/font-awesome/css/font-awesome.min.css'

    ]
})

export class RenewalReportComponent implements OnInit
{
    private _reportService;
    RenewalRequestModel : RenewalRequestModel = new RenewalRequestModel(); 
    errorMessage: any;
    dataSource: MatTableDataSource<RenewalReportViewModel>;
    constructor(reportService: ReportService) {
        this._reportService = reportService;
    }
    fromminDate: Date;
    frommaxDate: Date;
    showDatepicker :boolean;
    exportbutton : boolean;
    tominDate: Date;
    tomaxDate: Date;
     

    @ViewChild('TABLE') table: ElementRef;
    displayedColumns = ['Name', 'Contactno', 'EmailID', 'MemberNo', 'PlanName', 'SchemeName', 'JoiningDate', 'RenwalDate', 'PaymentAmount'];

    ngOnInit() 
    {
        this.fromminDate = new Date();
        this.frommaxDate = new Date();
        this.fromminDate.setDate(this.fromminDate.getDate() - 60);
        this.frommaxDate.setDate(this.frommaxDate.getDate() + 30);
        this.tominDate = new Date();
        this.tomaxDate = new Date();
        this.showDatepicker = true;
        this.exportbutton = true;
    }

    ExportTOExcel() 
    {
        const ws: XLSX.WorkSheet = XLSX.utils.table_to_sheet(this.table.nativeElement);
        const wb: XLSX.WorkBook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');
        /* save to file */
        XLSX.writeFile(wb, 'RenewalReport.xlsx');
    }

    onChangeFromDate(todate:Date)
    {
        console.log(this.showDatepicker);
        this.showDatepicker = !this.showDatepicker;
        console.log(this.showDatepicker);
        this.tominDate = todate;
        this.tomaxDate.setDate(this.tominDate.getDate() + 60);      
    }


    onSubmit() {
        if (this.RenewalRequestModel.Paymentfromdate == null && this.RenewalRequestModel.Paymentfromto == null) 
        {

        }
        else 
        {
            this._reportService.GetRenewalReport(this.RenewalRequestModel).subscribe(
                allrecords => 
                {
                    this.dataSource = new MatTableDataSource(allrecords);
                    this.exportbutton = false;
                },
                error => this.errorMessage = <any>error
            );
        }
    }

}


