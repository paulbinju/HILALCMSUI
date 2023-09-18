import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { Ilookup } from 'src/app/interfaces/ilookup.model';
import { LookupService } from 'src/app/services/lookup.service';
import { LookupaddComponent } from '../lookupadd/lookupadd.component';

@Component({
  selector: 'app-lookup',
  templateUrl: './lookup.component.html',
  styleUrls: ['./lookup.component.css']
})
export class LookupComponent implements OnInit {

  public lookupAry: Ilookup[] = [];
public querystring:string;
  displayedColumns: string[] = ['lookupID', 'groupname', 'title', 'orderNo'];

 
  constructor(private _lookupservice: LookupService, private dialog: MatDialog, private activatedRoute : ActivatedRoute,
    private npxspinnerservice : NgxSpinnerService) { }

  ngOnInit(): void {
   
this.activatedRoute.paramMap.subscribe(params => {
  this.querystring = params.get('ltype');
  this.loadData();
    })
   
  }

loadData(){

  this.npxspinnerservice.show();
  setTimeout(() => {
    this._lookupservice.getLookup().subscribe({
      next: data => {
        const result = data.filter(ltype => ltype.groupName == this.querystring);
        this.lookupAry = result;
        this.npxspinnerservice.hide();
      },
      error: error => {
        console.error('There was an error!', error);
      }
    })
  }, 1000);

  
}


  addnew() {
    this.dialog.open(LookupaddComponent, {
      width:'60%',
      data: {
        groupName: this.querystring
      },
    }).afterClosed().subscribe(()=>this.loadData());

  }

}
