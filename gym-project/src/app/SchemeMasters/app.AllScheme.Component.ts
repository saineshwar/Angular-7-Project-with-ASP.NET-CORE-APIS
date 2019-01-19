import { Component, OnInit, ViewChild } from '@angular/core';
import { SchemeService } from './Services/app.Scheme.Service';
import { SchemeMasterViewModel } from './Models/app.SchemeViewModel';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import { MatTableDataSource, MatSort, MatPaginator } from '@angular/material';

@Component({
  templateUrl: './app.AllSchemeComponent.html',
  styleUrls: ['../Content/vendor/bootstrap/css/bootstrap.min.css', '../Content/vendor/font-awesome/css/font-awesome.min.css']

})

export class AllSchemeComponent implements OnInit {
  private _SchemeService;
  AllSchemeList: SchemeMasterViewModel[];
  errorMessage: any;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  displayedColumns: string[] = ['SchemeID', 'SchemeName', 'Status', 'Createddate', 'EditAction', 'DeleteAction'];
  dataSource: any;
  
  


  constructor(private location: Location, private _Route: Router, private schemeService: SchemeService) {
    this._SchemeService = schemeService;

  
  }

  ngOnInit() {


    this._SchemeService.GetAllScheme().subscribe(
      AllScheme => {
        this.AllSchemeList = AllScheme
        this.dataSource = new MatTableDataSource(this.AllSchemeList);
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
       
      },
      error => this.errorMessage = <any>error
    );

  }
  
  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
  Delete(schemeId): void {
    if (confirm("Are you sure to delete Scheme ?")) {
      this._SchemeService.DeleteScheme(schemeId).subscribe
        (
        response => {
          if (response.StatusCode == "200") {
            alert('Deleted Scheme Successfully');
            location.reload();
          }
          else {
            alert('Something Went Wrong');
            this._Route.navigate(['/Scheme/All']);
          }
        }
        )
    }
  }

}