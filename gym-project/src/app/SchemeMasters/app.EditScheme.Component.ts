import { Component, OnInit } from '@angular/core';
import { SchemeService } from './Services/app.Scheme.Service';
import { SchemeMasterModel } from './app.SchemeModel';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
    templateUrl: './app.EditSchemeComponent.html',
    styleUrls: ['../Content/vendor/bootstrap/css/bootstrap.min.css']
})

export class EditSchemeComponent implements OnInit {
    title = "Edit Scheme Master";
    SchemeForms: SchemeMasterModel = new SchemeMasterModel();
    private _SchemeService;
    private responsedata: any;
    private SchemeID: string;
    errorMessage: any;

    constructor(private _Route: Router,private _routeParams: ActivatedRoute, private schemeService: SchemeService) {
        this._SchemeService = schemeService;
    }

    ngOnInit() 
    {
        this.SchemeID = this._routeParams.snapshot.params['schemeId'];
        if (this.SchemeID != null) 
        {
            var data = this._SchemeService.GetSchemeById(this.SchemeID).subscribe(
                Scheme => {
                    this.SchemeForms.SchemeID = Scheme.SchemeID;
                    this.SchemeForms.SchemeName = Scheme.SchemeName;
                    this.SchemeForms.Status = Scheme.Status;
                },
                error => this.errorMessage = <any>error
            );
        }
    }


    onSubmit() 
    {
   

        this._SchemeService.UpdateScheme(this.SchemeForms)
        .subscribe(response => 
        {
            if(response.StatusCode == "200")
            {
                alert('Updated Scheme Successfully');
                this._Route.navigate(['/Scheme/All']);
            }
        })
    }

}