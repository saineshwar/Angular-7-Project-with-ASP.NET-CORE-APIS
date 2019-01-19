import { Component, OnInit, ViewChild } from '@angular/core';
import { UserModel } from './Models/app.UserModel';
import { UserService } from './Services/app.UserRegistration.Service';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import { MatTableDataSource, MatSort, MatPaginator } from '@angular/material';

@Component({
    templateUrl: './app.AllUserRegistration.html',
    styleUrls: ['../Content/vendor/bootstrap/css/bootstrap.min.css', '../Content/vendor/font-awesome/css/font-awesome.min.css']

})

export class AllUserRegistrationComponent implements OnInit {
    private _userService;
    AllUserList: UserModel[];
    errorMessage: any;
    @ViewChild(MatSort) sort: MatSort;
    @ViewChild(MatPaginator) paginator: MatPaginator;
    displayedColumns: string[] = ['Id', 'UserName', 'FullName', 'EmailId', 'Contactno', 'Status', 'EditAction', 'DeleteAction'];
    dataSource: any;

    constructor(private location: Location, private _Route: Router, private userService: UserService) {
        this._userService = userService;
    }

    ngOnInit() {
        this._userService.GetAllUsers().subscribe(
            allUsers => {
                this.AllUserList = allUsers
                this.dataSource = new MatTableDataSource(this.AllUserList);
                this.dataSource.sort = this.sort;
                this.dataSource.paginator = this.paginator;
            },
            error => this.errorMessage = <any>error
        );
    }

    applyFilter(filterValue: string) {
        this.dataSource.filter = filterValue.trim().toLowerCase();
    }
    Delete(Id): void {
        if (confirm("Are you sure to delete User ?")) {
            this._userService.DeleteUser(Id).subscribe
                (
                response => {
                    if (response.StatusCode == "200") {
                        alert('Deleted User Successfully');
                        location.reload();
                    }
                    else {
                        alert('Something Went Wrong');
                        this._Route.navigate(['/AllSchemeMaster']);
                    }
                }
                )
        }
    }

}