import { Component, OnInit } from '@angular/core';
import { PeriodService } from '../PeriodMaster/Services/app.Period.Service';
import { SchemeService } from '../SchemeMasters/Services/app.Scheme.Service';
import { PeriodModel } from '../PeriodMaster/Models/app.PeriodModel';
import { PlanMasterModel } from './Models/app.PlanMasterModel';
import { SchemeDropdownModel } from '../SchemeMasters/Models/app.SchemeDropdownModel';
import { PlanService } from '../PlanMaster/Services/app.planmaster.service';
import { Router } from '@angular/router';

@Component({
    templateUrl: './app.planmaster.component.html',
    styleUrls: ['../Content/vendor/bootstrap/css/bootstrap.min.css',
        '../Content/vendor/metisMenu/metisMenu.min.css',
        '../Content/dist/css/sb-admin-2.css',
        '../Content/vendor/font-awesome/css/font-awesome.min.css'
    ]
})

export class PlanMasterComponent implements OnInit {
    private _periodService;
    private _schemeService;
    private _planService;

    PeriodList: PeriodModel[];
    AllActiveSchemeList: SchemeDropdownModel[];
    errorMessage: any;
    planModel: PlanMasterModel = new PlanMasterModel();
    title = 'Add Plan';
    output: any;

    constructor(private _Route: Router,private periodService: PeriodService,
        private schemeService: SchemeService,
        private planService: PlanService
    ) {
        this._periodService = periodService;
        this._schemeService = schemeService;
        this._planService = planService;

    }

    ngOnInit(): void {
        this._periodService.GetAllPeriod().subscribe(
            allPeriod => {
                this.PeriodList = allPeriod
            },
            error => this.errorMessage = <any>error
        );

        this._schemeService.GetAllActiveSchemeList().subscribe(
            allActiveScheme => {
                this.AllActiveSchemeList = allActiveScheme
            },
            error => this.errorMessage = <any>error
        );
    }

    numberOnly(event): boolean {
        const charCode = (event.which) ? event.which : event.keyCode;
        if (charCode > 31 && (charCode < 48 || charCode > 57)) {
            return false;
        }
        return true;

    }

    onSubmit() {
     

        this._planService.SavePlan(this.planModel).subscribe(
            response => {
            this.output = response
            if (this.output.StatusCode == "409") {
                alert('Plan Already Exists');
            }
            else if (this.output.StatusCode == "200") {
                alert('Plan Saved Successfully');
                this._Route.navigate(['/Plan/All']);
            }
            else {
                alert('Something Went Wrong');
            }
        });
    }
}