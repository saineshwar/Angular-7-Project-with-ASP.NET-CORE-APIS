import { Component } from '@angular/core';
import { SchemeMasterModel } from './app.SchemeModel';
import { SchemeService } from './Services/app.Scheme.Service';
import { Router } from '@angular/router';
import { MatSnackBarVerticalPosition, MatSnackBarHorizontalPosition, MatSnackBarConfig, MatSnackBar } from '@angular/material';

@Component({
    templateUrl: './app.SchemeMaster.html',
    styleUrls: ['../Content/vendor/bootstrap/css/bootstrap.min.css']
})

export class SchemeComponent {
    title = "Scheme Master";
    SchemeForms: SchemeMasterModel = new SchemeMasterModel();
    private _SchemeService;
    private responsedata: any;
    
    actionButtonLabel: string = 'Retry';
    action: boolean = false;
    setAutoHide: boolean = true;
    autoHide: number = 2000;
    verticalPosition: MatSnackBarVerticalPosition = 'top';
    horizontalPosition: MatSnackBarHorizontalPosition = 'center';



    constructor(private _Route: Router,public snackBar: MatSnackBar,  private schemeService: SchemeService) {
        this._SchemeService = schemeService;
    }
    output: any;
    onSubmit() {
      

        this._SchemeService.SaveScheme(this.SchemeForms).subscribe(
            response => 
            {
               
                this.output = response;
                if (this.output.StatusCode == "409") 
                {
                    let config = new MatSnackBarConfig();
                    config.duration = this.setAutoHide ? this.autoHide : 0;
                    config.verticalPosition = this.verticalPosition;
                    this.snackBar.open("Scheme Name Already Exists", this.action ? this.actionButtonLabel : undefined, config);
                   
                }
                else if (this.output.StatusCode == "200") 
                { 
                    let config = new MatSnackBarConfig();
                    config.duration = this.setAutoHide ? this.autoHide : 0;
                    config.verticalPosition = this.verticalPosition;
                    this.snackBar.open("Saved Scheme Successfully", this.action ? this.actionButtonLabel : undefined, config);
                    this._Route.navigate(['/Scheme/All']);
                }
                else {
                    let config = new MatSnackBarConfig();
                    config.duration = this.setAutoHide ? this.autoHide : 0;
                    config.verticalPosition = this.verticalPosition;
                    this.snackBar.open("Something Went Wrong", this.action ? this.actionButtonLabel : undefined, config);
                   
                }
            }
        );



    }

}