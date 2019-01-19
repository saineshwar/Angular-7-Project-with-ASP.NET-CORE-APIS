import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';

import { PaginationService } from '../../Shared/PaginationService';
import { MemberRegistrationModel } from '../Models/app.memberRegistrationModel';
import { MemberRegistrationService } from '../Services/app.MemberRegistration.service';


@Component({
    selector: 'app-list',
    templateUrl: 'Memberlist.component.html',
    styleUrls: ['../../Content/vendor/bootstrap/css/bootstrap.min.css',
        '../../Content/vendor/metisMenu/metisMenu.min.css',
        '../../Content/dist/css/sb-admin-2.css',
        '../../Content/vendor/font-awesome/css/font-awesome.min.css'
    ]
})

export class MemberListComponent {

    dataSource = new MatTableDataSource<MemberRegistrationModel>();
    displayedColumns: string[] = ['MemberId', 'MemberNo', 'MemberName', 'Contactno', 'PlanName', 'SchemeName', 'JoiningDate', 'EditAction', 'DeleteAction'];
  
    _Route: any;

    @Input('dataSource')
    set dataSourceForTable(value: MemberRegistrationModel[]) 
    {
        this.dataSource = new MatTableDataSource<MemberRegistrationModel>(value);
    }

    @Input() totalCount: number;
    @Output() onPageSwitch = new EventEmitter();

    constructor(public paginationService: PaginationService, private memberregistration: MemberRegistrationService,) { }

    applyFilter(filterValue: string) {
        this.dataSource.filter = filterValue.trim().toLowerCase();
    }

    Delete(MemberId): void {
        console.log(MemberId);
        if (confirm("Are you sure to delete Member ?")) {
            this.memberregistration.DeleteMember(MemberId).subscribe
                (
                    response => {
                        if (response.StatusCode == "200") {
                            alert('Deleted Member Successfully');
                            location.reload();
                        }
                        else {
                            alert('Something Went Wrong');
                            this._Route.navigate(['/Member/AllMember']);
                        }
                    }
                )
        }
    }

}
