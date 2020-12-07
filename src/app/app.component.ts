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
  human = true;
  computer = false;

  ngOnInit() {
    this.renderTable(this.sizenumber)
  }

  renderTable(number:number){
    this.table = this.createTable(number);
    this.header = Object.keys(this.createTable(number));
  }
  createTable(number:number){
    let col=[]
    for(let i =0; i<number;i++){
      let row=[];
      for(let j =0; j<number;j++){
        let obj:any={}
        obj[j] = 0;
        row.push(obj);
      }
      col.push(row);
    }
    return col;
  }

  definValue(obj:any,key:string){
    return obj[key];
  }

  turn(row:number,col:number){
    this.table[row][+col][+col]=true;

    if(this.winpattern(this.table,true)){
      console.log('win!!')
    }
    console.log(this.emptySpace());
  }

  emptySpace(){

  }

  demoMove(side:boolean){
    let col=[];
    let point = 0;
    let demotable = this.table;
    for(let i =0; i<this.sizenumber;i++){
      let row:any=[];
      for(let j =0; j<this.sizenumber;j++){
        if(demotable[i][j][j] === 0){
          demotable[i][j][j] === side
          if(this.winpattern(demotable,this.computer)){
            point++; 
          }
        }
      }
      col.push(row);
    }
    return col;

  }

  winpattern(table:any,side:boolean){
    let isWin=false;
    let isWinArray:any =[];

    //horizontal
    this.header.map((x: string | number)=>{
      this.header.map((y: string | number)=>{
        isWinArray.push( table[x][y][y]);
      })
      
      if((isWinArray.filter((res: boolean)=>res==!side)).length === 0){
        isWin = true;
      }
      isWinArray = [];
    })

    //vertical
    this.header.map((x: string | number)=>{
      this.header.map((y: string | number)=>{
        isWinArray.push( table[y][x][x]);
      })
      
      if((isWinArray.filter((res: boolean)=>res==!side)).length === 0){
        isWin = true;
      }
      isWinArray = [];
    })
    

    //diagonal 
      for(let x = 0; x<this.sizenumber;x++){
        isWinArray.push(table[x][x][x]);
      }
      if((isWinArray.filter((res: boolean)=>res==!side)).length === 0){
        isWin = true;
      }
      isWinArray = [];

    //diagonal 
      let y = this.sizenumber-1;
      for(let x = 0; x<this.sizenumber;x++){     
        isWinArray.push(table[y-x][x][x]);
      }
      if((isWinArray.filter((res: boolean)=>res==!side)).length === 0){
        isWin = true;
      }
      isWinArray = [];
    

    return isWin;
  }




  // winpattern(board:any, side:boolean){
  //   if(
  //     board[]
  //   )
  // }
}


