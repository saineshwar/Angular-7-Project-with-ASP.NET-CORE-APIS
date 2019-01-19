import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { DatePipe } from '@angular/common';
import { UserModel } from './Models/app.UserModel';
import { UserService } from './Services/app.UserRegistration.Service';

@Component({
    templateUrl: './app.EditUserRegistration.html',
    styleUrls: ['../Content/vendor/bootstrap/css/bootstrap.min.css',
        '../Content/vendor/metisMenu/metisMenu.min.css',
        '../Content/dist/css/sb-admin-2.css',
        '../Content/vendor/font-awesome/css/font-awesome.min.css'
    ]
})


export class EditUserRegistrationComponent implements OnInit {
    UserModel: UserModel = new UserModel();
    private _userService;
    output: any;
    Id: any;
    errorMessage: any;


    constructor(
        private datePipe: DatePipe,
        private _Route: Router,
        private _routeParams: ActivatedRoute,
        private userService: UserService
    ) {
        this._userService = userService;
    }

    ngOnInit(): void {
        this.Id = this._routeParams.snapshot.params['UserId'];

        // GetRoleById
        this._userService.GetUserId(this.Id).subscribe(
            userModel => {
                this.UserModel = userModel

            },
            error => this.errorMessage = <any>error);
    }



    onSubmit() {
        

        this._userService.UpdateUser(this.UserModel).subscribe(
            response => {
                this.output = response
                if (this.output.StatusCode == "409") {
                    alert('User Already Exists');
                }
                else if (this.output.StatusCode == "200") {
                    alert('User Details Updated Successfully');
                    this._Route.navigate(['/User/All']);
                }
                else {
                    alert('Something Went Wrong');
                }
            });
    }
}