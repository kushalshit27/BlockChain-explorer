import { Accounts } from './../accounts';
import { ApiServiceService } from './../api-service.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  title: string;
  displayedColumns: string[] = ['name', 'capital', 'region'];
  data: Accounts[] = [];
  isLoadingResults = true;
  constructor(private api: ApiServiceService) {
    this.title = 'BlockChain-explorer';
  }

  ngOnInit() {
    this.api.getAccounts()
    .subscribe(res => {
      this.data = res;
      console.log(this.data);
      this.isLoadingResults = false;
    }, err => {
      console.log(err);
      this.isLoadingResults = false;
    });
  }

}
