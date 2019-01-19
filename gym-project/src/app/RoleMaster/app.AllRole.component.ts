import { Component, OnInit, ViewChild } from '@angular/core';
import { RoleModel } from './Models/app.RoleModel';
import { RoleService } from './Services/app.role.Service';
import { Router } from '@angular/router';
import { MatTableDataSource, MatSort, MatPaginator } from '@angular/material';

@Component({
    templateUrl: './app.AllRole.html',
    styleUrls: ['../Content/vendor/bootstrap/css/bootstrap.min.css',
        '../Content/vendor/metisMenu/metisMenu.min.css',
        '../Content/dist/css/sb-admin-2.css',
        '../Content/vendor/font-awesome/css/font-awesome.min.css'
    ]
})

export class AllRoleComponent implements OnInit {


    private _roleService;
    RoleList: RoleModel = new RoleModel();
    output: any;
    errorMessage: any;
    @ViewChild(MatSort) sort: MatSort;
    @ViewChild(MatPaginator) paginator: MatPaginator;
    displayedColumns: string[] = ['RoleId', 'RoleName', 'Status', 'EditAction', 'DeleteAction'];
    dataSource: any;

    constructor(private _Route: Router, roleService: RoleService) {
        this._roleService = roleService;
    }

    ngOnInit(): void {
        this._roleService.GetAllRole().subscribe(
            allrole => {
                this.RoleList = allrole
                this.dataSource = new MatTableDataSource(allrole);
                this.dataSource.sort = this.sort;
                this.dataSource.paginator = this.paginator;
            },
            error => this.errorMessage = <any>error
        );
    }


    Delete(RoleId) {

        if (confirm("Are you sure to delete Role ?")) {
            this._roleService.DeleteRole(RoleId).subscribe
                (
                response => {
                    if (response.StatusCode == "200") {
                        alert('Deleted Role Successfully');
                        location.reload();
                    }
                    else {
                        alert('Something Went Wrong');
                        this._Route.navigate(['/Role/All']);
                    }
                }
                )
        }
    }
    applyFilter(filterValue: string) {
        this.dataSource.filter = filterValue.trim().toLowerCase();
      }

}