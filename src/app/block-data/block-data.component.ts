import { Component, OnInit } from '@angular/core';
import { WebsocketService } from './../websocket.service';
import { interval } from 'rxjs';
import { Observable, of, pipe } from 'rxjs';
import { switchMap, debounceTime, catchError } from 'rxjs/operators';
import { BlockchainResponse } from '../blockchain-response';

@Component({
  selector: 'app-block-data',
  templateUrl: './block-data.component.html',
  styleUrls: ['./block-data.component.css']
})
export class BlockDataComponent implements OnInit {
  loginPayload: any;
  data: any;
  blockchainData: BlockchainResponse;
  blockSize: any[] = new Array(0);
  displayedColumns: string[] = ['hash', 'fees', 'size', 'preference', 'confirmations'];
  isLoadingResults = true;
  constructor(private ws: WebsocketService) {
    this.loginPayload = {"method": "eth_blockNumber", "params": [], "id":1};
  }

  ngOnInit() {

    interval(5000).pipe(
      switchMap(() => this.ws.getBlocks(this.loginPayload))
    ).subscribe( (blockchain: BlockchainResponse) => {
      this.blockchainData = blockchain;
      const blockSizeDecimal = parseInt(String(blockchain.result), 16);
      const blockSizeDecimalArray = new Array(blockSizeDecimal).fill(0);
      this.blockSize = blockSizeDecimalArray.map((currElement, index) => {
          index = index + 1;
          return {
            blockNo : index,
            blockHex : index.toString(16)
          };
      }).reverse();
      console.log(this.blockSize);
      this.isLoadingResults = false;
    }, err => {
      console.log(err);
      this.isLoadingResults = false;
    });

  }

}
