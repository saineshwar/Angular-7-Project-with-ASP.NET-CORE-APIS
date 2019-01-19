import { Component, OnInit } from '@angular/core';
import { AssignRemoveModel } from './Models/AssignRemoveModel';
import { UserService } from '../CreateUsers/Services/app.UserRegistration.Service';
import { UserDropdownModel } from '../CreateUsers/Models/app.UserDropdownModel';
import { RoleService } from '../RoleMaster/Services/app.role.Service';
import { RoleModel } from '../RoleMaster/Models/app.RoleModel';
import { AssignandRemoveRoleService } from './Services/app.AssignandRemoveRole.Service';
import { Router } from '@angular/router';

@Component({
    templateUrl: './app.AssignandRemoveRole.html',
    styleUrls: ['../Content/vendor/bootstrap/css/bootstrap.min.css',
        '../Content/vendor/metisMenu/metisMenu.min.css',
        '../Content/dist/css/sb-admin-2.css',
        '../Content/vendor/font-awesome/css/font-awesome.min.css'
    ]
})

export class AssignRoleComponent implements OnInit {
    private _userservice;
    private _roleservice;
    private _assignandremoveservice;
    UserList: UserDropdownModel[];
    AssignRemoveModel: AssignRemoveModel = new AssignRemoveModel();
    RoleList :RoleModel[];
  
    errorMessage: any;
    output: any;
    constructor(private userservice: UserService ,
        private roleservice :RoleService,
        private assignandremoverolerervice : AssignandRemoveRoleService,
        private _Route: Router
        ) 
        {
        this._userservice = userservice;
        this._roleservice = roleservice;
        this._assignandremoveservice = assignandremoverolerervice;
    }
    
    ngOnInit(): void 
    {
        this._userservice.GetAllUsersDropdown().subscribe(
            allUsers => {
                this.UserList = allUsers
            },
            error => this.errorMessage = <any>error
        );

        this._roleservice.GetAllRole().subscribe(
            allroles => {
                this.RoleList = allroles
            },
            error => this.errorMessage = <any>error
        );
    }
   

    onSubmit(buttonType): void {
        if(buttonType==="onAssign") 
        {
            console.log(this.AssignRemoveModel);
            this._assignandremoveservice.AssignRole(this.AssignRemoveModel).subscribe(
                response => 
                {
                    this.output = response
                    if (this.output.StatusCode == "409") {
                        alert('Role Already Exists');
                    }
                    else if (this.output.StatusCode == "200") {
                        alert('Role Assigned Successfully');
                        this._Route.navigate(['/Assign/AllRole']);
                    }
                    else {
                        alert('Something Went Wrong');
                    }
                });


        }
        if(buttonType==="onRemove")
        {
            this._assignandremoveservice.RemoveRole(this.AssignRemoveModel).subscribe(
                response => 
                {
                    this.output = response
                    if (this.output.StatusCode == "409") {
                        alert('Role does not Exists');
                    }
                    else if (this.output.StatusCode == "200") {
                        alert('Role Removed Successfully');
                        this._Route.navigate(['/Assign/AllRole']);
                    }
                    else {
                        alert('Something Went Wrong');
                    }
                });
        }

}
}