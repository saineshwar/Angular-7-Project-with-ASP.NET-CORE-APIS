import { OnInit, Component, ViewChild, ElementRef } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import * as XLSX from 'xlsx';
import { ReportService } from './Services/app.ReportServices';
import { YearList } from './Models/app.YearModel';

import { YearwiseResponseModel } from './Models/app.YearwiseResponseModel';
import { YearwiseRequestModel } from './Models/app.YearwiseRequestModel';

@Component({
    templateUrl: './app.YearwiseReport.html',
    styleUrls: ['../Content/vendor/bootstrap/css/bootstrap.min.css',
        '../Content/vendor/metisMenu/metisMenu.min.css',
        '../Content/dist/css/sb-admin-2.css',
        '../Content/vendor/font-awesome/css/font-awesome.min.css'

    ]
})

export class YearwiseReportComponent implements OnInit
{
    private _reportService;
    YearwiseRequestModel: YearwiseRequestModel = new YearwiseRequestModel();
    YearList: YearList[];
    errorMessage: any;
    exportbutton : boolean;
    dataSource: MatTableDataSource<YearwiseResponseModel>;
    YearwiseReportModel: YearwiseResponseModel[];
    constructor(reportService: ReportService) {
        this._reportService = reportService;
    }

    @ViewChild('TABLE') table: ElementRef;
    displayedColumns = ['CurrentYear', 'April', 'May', 'June', 'July', 'August', 'Sept', 'Oct', 'Nov', 'Decm','Jan','Feb','March','Total'];


    ngOnInit() {

        this.YearList = [
            {
                YearID: "2018",
                YearName: "2018"
            }, {
                YearID: "2019",
                YearName: "2019"
            }];

            this.exportbutton = true;

    }

    ExportTOExcel() {
        const ws: XLSX.WorkSheet = XLSX.utils.table_to_sheet(this.table.nativeElement);
        const wb: XLSX.WorkBook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');
        /* save to file */
        XLSX.writeFile(wb, 'YearWiseReport.xlsx');
    }

    onSubmit() {
        if (this.YearwiseRequestModel.YearID == null) 
        {

        }
        else 
        {
            this._reportService.GetYearWiseReport(this.YearwiseRequestModel).subscribe(
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


