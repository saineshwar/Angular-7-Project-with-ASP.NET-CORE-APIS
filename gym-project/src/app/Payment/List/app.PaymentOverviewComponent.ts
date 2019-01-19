import { Component, OnInit } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { PaginationService } from '../../Shared/PaginationService';
import { PaymentDetailsModel } from '../Models/app.PaymentDetailsModel';
import { PaymentService } from '../Services/app.PaymentDetails.Service';

@Component({
    templateUrl: 'app.PaymentViewComponent.html'
  

})

export class PaymentOverviewComponent implements OnInit {

    paymentdataSource: any;
    paytotalCount: number;


    constructor(
        private paymentservice: PaymentService,
        private paginationService: PaginationService) { }

    ngOnInit(): void {
        this.getAllPayment();
    }

    payonPageSwitch(event: PageEvent) {
        this.paginationService.change(event);
        this.getAllPayment();
    }

    getAllPayment() {
        this.paymentservice.getAll<PaymentDetailsModel[]>()
            .subscribe((result: any) => {
                console.log(result.headers);
                this.paytotalCount = JSON.parse(result.headers.get('X-Pagination')).totalCount;
                this.paymentdataSource = result.body.value;
            });
    }

    applyFilter(filterValue: string) {
        console.log(filterValue);
        console.log("###");

        filterValue = filterValue.toLowerCase();
        this.paymentdataSource.filter(it => 
            {
            var d = it.toLowerCase().includes(filterValue);
            console.log(d);
        });
        


    }



}
