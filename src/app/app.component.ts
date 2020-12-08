import { Component, OnInit } from '@angular/core';
import { TicTacToeService } from './serviecs/tic-tac-toe.service';

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

  constructor(
    private services : TicTacToeService
  ) { }

  async ngOnInit() {
    this.renderTable(this.sizenumber);
  }

  renderTable(number:number){
    this.table = this.createTable(number);
    this.header = Object.keys(this.createTable(number));
  }

  minimax(table:any[],side:boolean){
    let emptySpace = this.emptySpace(table)
    if(this.winpattern(table,this.human)) return {score: -10};
    else if(this.winpattern(table,this.computer)) return {score: 10};
    else if(emptySpace.length === 0) return {score: 0};

    let moves =[];

    for(let i =0; i<emptySpace.length;i++){
      let move:any={};
      //for(let j =0; j<this.sizenumber;j++){
        move.indexI = emptySpace[i].indexI;
        move.indexJ = emptySpace[i].indexJ;
        let origin = table[move.indexI][move.indexJ][move.indexJ]
        table[move.indexI][move.indexJ][move.indexJ] = side;

        if(side === this.human){
          let result:any = this.minimax(table,this.computer);
          move.score = result.score;
        }
        else{
          let result:any = this.minimax(table,this.human);
          move.score = result.score;
        }

        table[move.indexI][move.indexJ][move.indexJ] = origin;
        moves.push(move);
    }
    let bestMove:any
    if(side===this.computer){
      let bestScore = -Infinity;
      for(let i=0;i<moves.length;i++){
          if(moves[i].score > bestScore){
            bestScore = Math.max(moves[i].score,bestScore);
            bestMove = i;
           
      }
    }
  }
    else{    
      let bestScore = +Infinity;
      for(let i=0;i<moves.length;i++){
        if(moves[i].score < bestScore){
          bestScore = moves[i].score;
          bestMove = i;
        }
      }
    }
    return moves[bestMove];
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

   async turn(row:number,col:number){
    this.table[row][+col][+col]=this.human;
    if(this.winpattern(this.table,this.human)) {
      alert('WIN');
    }
    else if(this.winpattern(this.table,this.computer)){
      alert('LOOSE');
    }
    else{
      let board = this.limitsize(row,col)
      let computerTurn =  await this.minimax(board,this.computer);
      if(this.emptySpace(this.table).length !== 0){
        this.table[computerTurn.indexI][computerTurn.indexJ][computerTurn.indexJ] = this.computer;
      }
      else{
        alert('DRAW');
      }
    }
  }

  limitsize(row:number,col:number){
    let data = this.emptySpace(this.table)
    if(data.length > 9){
       //=  this.table
    }
    else{
      return this.table;
    }
  }


  emptySpace(table:any){
    let emptyArray:any= [];
    for(let i =0; i<this.sizenumber;i++){
      let emptyObj:any={};
      for(let j =0; j<this.sizenumber;j++){
        if(table[i][j][j]===0){
          emptyObj.indexI = i
          emptyObj.indexJ = j
          emptyArray.push(emptyObj);
        }
        emptyObj={};
      }
    }
    return emptyArray;
  }

  winpattern(table:any,side:boolean){
    let isWin=false;
    let isWinArray:any =[];

    //horizontal
    this.header.map((x: string | number)=>{
      this.header.map((y: string | number)=>{
        isWinArray.push( table[x][y][y]);
      })
      
      if((isWinArray.filter((res: boolean)=>res!==side)).length === 0){
        isWin = true;
      }
      isWinArray = [];
    })

    //vertical
    this.header.map((x: string | number)=>{
      this.header.map((y: string | number)=>{
        isWinArray.push( table[y][x][x]);
      })
      
      if((isWinArray.filter((res: boolean)=>res!==side)).length === 0){
        isWin = true;
      }
      isWinArray = [];
    })
    

    //diagonal 
      for(let x = 0; x<this.sizenumber;x++){
        isWinArray.push(table[x][x][x]);
      }
      if((isWinArray.filter((res: boolean)=>res!==side)).length === 0){
        isWin = true;
      }
      isWinArray = [];

    //diagonal 
      let y = this.sizenumber-1;
      for(let x = 0; x<this.sizenumber;x++){     
        isWinArray.push(table[y-x][x][x]);
      }
      if((isWinArray.filter((res: boolean)=>res!==side)).length === 0){
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


