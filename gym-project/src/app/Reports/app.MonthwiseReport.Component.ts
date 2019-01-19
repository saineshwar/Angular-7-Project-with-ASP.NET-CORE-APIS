import { OnInit, Component, ViewChild, ElementRef } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import * as XLSX from 'xlsx';
import { ReportService } from './Services/app.ReportServices';
import { MonthList } from './Models/app.MonthModel';
import { MonthWiseResponseModel } from './Models/app.MonthWiseResponseModel';
import { MonthWiseRequestModel } from './Models/app.MonthWiseRequestModel';

@Component({
    templateUrl: './app.MonthwiseReport.html',
    styleUrls: ['../Content/vendor/bootstrap/css/bootstrap.min.css',
        '../Content/vendor/metisMenu/metisMenu.min.css',
        '../Content/dist/css/sb-admin-2.css',
        '../Content/vendor/font-awesome/css/font-awesome.min.css'

    ]
})

export class MonthwiseReportComponent implements OnInit
{
    private _reportService;
    MonthWiseRequestModel: MonthWiseRequestModel = new MonthWiseRequestModel();
    MonthList: MonthList[];
    errorMessage: any;
    exportbutton : boolean;
    dataSource: MatTableDataSource<MonthWiseResponseModel>;
    MonthWiseResponseModel: MonthWiseResponseModel[];
    constructor(reportService: ReportService) {
        this._reportService = reportService;
    }

    @ViewChild('TABLE') table: ElementRef;
    displayedColumns = ['MemberFName', 'MemberNo', 'MemberLName', 'MemberMName', 'CreateDate', 'Total', 'Paymentmonth', 'PaymentAmount', 'Username'];


    ngOnInit() {

        this.exportbutton = true;
        this.MonthList = [
            {
                MonthID: "1",
                MonthName: "January"
            }, {
                MonthID: "2",
                MonthName: "February"
            },
            {
                MonthID: "3",
                MonthName: "March"
            },
            {
                MonthID: "4",
                MonthName: "April"
            },
            {
                MonthID: "5",
                MonthName: "May"
            },
            {
                MonthID: "6",
                MonthName: "June"
            },
            {
                MonthID: "7",
                MonthName: "July"
            },
            {
                MonthID: "8",
                MonthName: "August"
            },
            {
                MonthID: "9",
                MonthName: "September"
            },
            {
                MonthID: "10",
                MonthName: "October"
            },
            {
                MonthID: "11",
                MonthName: "November"
            },
            {
                MonthID: "12",
                MonthName: "December"
            }       
        ];

    }

    ExportTOExcel() {
        const ws: XLSX.WorkSheet = XLSX.utils.table_to_sheet(this.table.nativeElement);
        const wb: XLSX.WorkBook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');
        /* save to file */
        XLSX.writeFile(wb, 'MonthWiseReport.xlsx');
    }

    onSubmit() 
    {
        if (this.MonthWiseRequestModel.MonthId == null) 
        {

        }
        else 
        {
            this._reportService.GetMonthWiseReport(this.MonthWiseRequestModel).subscribe(
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


