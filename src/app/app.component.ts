import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'dynamic-tic-tac-toe';

  table:any = [];
  header:any = [];
  x= true;
  o = false;
  sizenumber = 3;

  ngOnInit() {
    this.table = this.createTable(3);
    this.header = Object.keys(this.createTable(3));
    //console.log(header);
    // board[1][0] = true;
    // console.log(board);
  }
  createTable(number:number){
    let col=[]
    for(let i =0; i<number;i++){
      let row=[];
      for(let j =0; j<number;j++){
        let obj:any={}
        obj[j] = null;
        row.push(obj);
      }
      col.push(row);
    }
    return col;
  }

  definValue(obj:any,key:string){
    return obj[key];
  }

  playerTurn(row:number,col:number){
    this.table[row][+col][+col]=true;
  }




  // winpattern(board:any, side:boolean){
  //   if(
  //     board[]
  //   )
  // }
}


