import { Component, OnInit, ViewChild } from '@angular/core';

import { Router } from '@angular/router';
import { MatTableDataSource, MatSort, MatPaginator, PageEvent } from '@angular/material';
import { AssignandRemoveRoleService } from './Services/app.AssignandRemoveRole.Service';
import { AssignRolesViewModel } from './Models/AssignRolesViewModel';


@Component({
    templateUrl: './app.AllAssignedRoles.html',
    styleUrls: ['../Content/vendor/bootstrap/css/bootstrap.min.css',
        '../Content/vendor/metisMenu/metisMenu.min.css',
        '../Content/dist/css/sb-admin-2.css',
        '../Content/vendor/font-awesome/css/font-awesome.min.css'
    ]
})

export class AllAssignRoleComponent implements OnInit 
{
    private _assignservice;
    @ViewChild(MatSort) sort: MatSort;
    @ViewChild(MatPaginator) paginator: MatPaginator;
    displayedColumns: string[] = ['RoleName', 'UserName'];
    dataSource: any;
    AssignModel : AssignRolesViewModel[]
    errorMessage: any;
    offset: any;

    ngOnInit(): void {
        this._assignservice.GetAllAssignedRoles().subscribe(
            assignModel => 
            {
   
                this.dataSource = new MatTableDataSource(assignModel);
                this.dataSource.sort = this.sort;
                this.dataSource.paginator = this.paginator;
            },
            error => this.errorMessage = <any>error
        );
    }

    constructor(private _Route: Router, assignservice: AssignandRemoveRoleService) {
        this._assignservice = assignservice;
    }

    applyFilter(filterValue: string) {
        this.dataSource.filter = filterValue.trim().toLowerCase();
      }
      
      getNext(event: PageEvent) {
        this.offset = event.pageSize * event.pageIndex
        // call your api function here with the offset
        console.log(event.pageSize);
        console.log(event.pageIndex);
      }

}