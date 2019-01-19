import { Component, OnInit } from '@angular/core';
import { SchemeService } from '../SchemeMasters/Services/app.Scheme.Service';
import { Router, ActivatedRoute } from '@angular/router';
import { SchemeDropdownModel } from '../SchemeMasters/Models/app.SchemeDropdownModel';
import { PlanService } from '../PlanMaster/Services/app.planmaster.service';
import { MemberRegistrationModel } from './Models/app.memberRegistrationModel';
import { MemberRegistrationService } from './Services/app.MemberRegistration.service';
import { ActivePlanModel } from '../PlanMaster/Models/app.ActivePlanModel';
import { DatePipe } from '@angular/common';

@Component({
    templateUrl: './app.EditMemberRegistration.html',
    styleUrls: ['../Content/vendor/bootstrap/css/bootstrap.min.css',
        '../Content/vendor/metisMenu/metisMenu.min.css',
        '../Content/dist/css/sb-admin-2.css',
        '../Content/vendor/font-awesome/css/font-awesome.min.css'
    ]
})


export class EditMemberRegistrationComponent implements OnInit 
{
    AllActiveSchemeList: SchemeDropdownModel[];
    AllActivePlanModel: ActivePlanModel[];
    MemberModel: MemberRegistrationModel = new MemberRegistrationModel();
    errorMessage: any;
    output: any;
    genderList: any[];
    bsRangeValue: Date[];
    bsValue = new Date();
    private _memberregistration;
    public age: number;
    MemberID: any;
 
    constructor(
        private _Route: Router,
        private _routeParams: ActivatedRoute,
        private memberregistration: MemberRegistrationService
    ) {
        this._memberregistration = memberregistration;
    }

    ngOnInit(): void 
    {
        this.MemberID = this._routeParams.snapshot.params['MemberId'];
        
          this.genderList = [
            { "id": 1, "name": "Male" },
            { "id": 2, "name": "Female" }
        ];

        this._memberregistration.GetAllActiveSchemeList().subscribe(
            allActiveScheme => {
                this.AllActiveSchemeList = allActiveScheme
            },
            error => this.errorMessage = <any>error
        );

        if(this.MemberID !=null)
        {
            this._memberregistration.GetMemberById(this.MemberID).subscribe(
                memberModel => 
                {
                    this.MemberModel = memberModel

                    this._memberregistration.GetAllActivePlans(this.MemberModel.SchemeID).subscribe(
                        allactivePlans => {
                            this.AllActivePlanModel = allactivePlans
                        },
                        error => this.errorMessage = <any>error
                    );

                },
                error => this.errorMessage = <any>error
            );

            
           
        }
        
    }

    onSubmit() {

        let demo = this.bsValue
        this._memberregistration.UpdateMember(this.MemberModel).subscribe(
            response => {
                this.output = response
                if (this.output.StatusCode == "409") {
                    alert('Member Already Exists');
                }
                else if (this.output.StatusCode == "200") {
                    alert('Member Details Updated Successfully');
                    this._Route.navigate(['/Member/All']);
                }
                else {
                    alert('Something Went Wrong');
                }
            });

       
    }
   
    CalcuateAge(birthdate) {
        if (birthdate) {
            var timeDiff = Math.abs(Date.now() - birthdate);
            this.MemberModel.Age = Math.floor((timeDiff / (1000 * 3600 * 24)) / 365);
        }
    }

    numberOnly(event): boolean 
    {
        const charCode = (event.which) ? event.which : event.keyCode;
        if (charCode > 31 && (charCode < 48 || charCode > 57)) {
            return false;
        }
        return true;

    }

    GetAmount(PlanID: number, SchemeID: number) {
        if (PlanID != null && SchemeID != null) {
            this._memberregistration.GetAmount(PlanID, SchemeID).subscribe(
                amount => {
                    this.MemberModel.Amount = amount
                },
                error => this.errorMessage = <any>error
            );
        }
    }
  
    OnChange(schemeId) {

        if (schemeId != null) {
            this._memberregistration.GetAllActivePlans(schemeId).subscribe(
                allactivePlans => {
                    this.AllActivePlanModel = allactivePlans
                },
                error => this.errorMessage = <any>error
            );
        }
    }


}