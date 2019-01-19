import { Component, OnInit } from '@angular/core'
import { Router } from '@angular/router'
@Component({
    template: ''
})
export class AdminLogoutComponent implements OnInit
{
    constructor(private _Route: Router)
    {

    }
    ngOnInit() {
        localStorage.removeItem('AdminUser');
        this._Route.navigate(['Login']);
    }
}

