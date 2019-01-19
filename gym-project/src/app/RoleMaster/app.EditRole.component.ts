import { Component, OnInit } from '@angular/core';
import { RoleModel } from './Models/app.RoleModel';
import { RoleService } from './Services/app.role.Service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
    templateUrl: './app.EditRole.html',
    styleUrls: ['../Content/vendor/bootstrap/css/bootstrap.min.css',
        '../Content/vendor/metisMenu/metisMenu.min.css',
        '../Content/dist/css/sb-admin-2.css',
        '../Content/vendor/font-awesome/css/font-awesome.min.css'
    ]
})

export class EditRoleComponent implements OnInit {
    roleId: number;


    private _roleService;
    RoleModel: RoleModel = new RoleModel();
    errorMessage: any;
    output: any;

    constructor(private _Route: Router, private _routeParams: ActivatedRoute, roleService: RoleService) {
        this._roleService = roleService;
    }


    ngOnInit(): void {
        this.roleId = this._routeParams.snapshot.params['RoleID'];

        // GetRoleById
        this._roleService.GetRoleById(this.roleId).subscribe(
            allPeriod => {
                this.RoleModel = allPeriod

            },
            error => this.errorMessage = <any>error);
    }



    onSubmit() 
    {
        

        this._roleService.UpdateRole(this.RoleModel).subscribe(
            response => {
            this.output = response
            if (this.output.StatusCode == "409") {
                alert('Role Already Exists');
            }
            else if (this.output.StatusCode == "200") {
                alert('Role Saved Successfully');
                this._Route.navigate(['/Role/All']);
            }
            else {
                alert('Something Went Wrong');
            }
        });
    }

}