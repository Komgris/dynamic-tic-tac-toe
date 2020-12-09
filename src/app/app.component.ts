import { Component, OnInit } from '@angular/core';
import { NgbModal, NgbModalOptions, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { SelectModeComponent } from './components/select-mode/select-mode.component';
import { TicTacToeService } from './serviecs/tic-tac-toe.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'dynamic-tic-tac-toe';

  table: any = [];
  header: any = [];
  sizenumber = 3;
  human = true;
  computer = false;
  isTwoplayer = false;
  side = true;
  ngbModalOptions: NgbModalOptions = {
    backdrop: 'static',
    keyboard: false
  };

  constructor(
    private modalService: NgbModal
  ) { }

  async ngOnInit() {
    this.selectMode();
  }
  selectMode(){
    const modal: NgbModalRef = this.modalService.open(SelectModeComponent, this.ngbModalOptions);
    modal.result.then(
      (result) => {
        this.isTwoplayer = result;
      }
    );
    this.renderTable(this.sizenumber);
  }
  renderTable(number: number) {
    this.table = this.createTable(number);
    this.header = Object.keys(this.createTable(number));
  }

  reset(){
    this.renderTable(this.sizenumber);
    this.side = false;
    this.selectMode();
  }
  minimax(table: any[], side: boolean) {
    let emptySpace = this.emptySpace(table);
    if (this.winpattern(table, this.human)) return { score: -10 };
    else if (this.winpattern(table, this.computer)) return { score: 10 };
    else if (emptySpace.length === 0) return { score: 0 };

    let moves = [];

    for (let i = 0; i < emptySpace.length; i++) {
      let move: any = {};
      move.indexI = emptySpace[i].indexI;
      move.indexJ = emptySpace[i].indexJ;
      table[move.indexI][move.indexJ][move.indexJ] = side;

      if (side === this.human) {
        let result: any = this.minimax(table, this.computer);
        move.score = result.score;
      }
      else {
        let result: any = this.minimax(table, this.human);
        move.score = result.score;
      }


      table[move.indexI][move.indexJ][move.indexJ] = 0;
      moves.push(move);
    }
    let bestMove: any
    if (side === this.computer) {
      let bestScore = -Infinity;
      for (let i = 0; i < moves.length; i++) {
        if (moves[i].score > bestScore) {
          bestScore = moves[i].score;
          bestMove = i;

        }
      }
    }
    else {
      let bestScore = +Infinity;
      for (let i = 0; i < moves.length; i++) {
        if (moves[i].score < bestScore) {
          bestScore = moves[i].score;
          bestMove = i;
        }
      }
    }
    return moves[bestMove];
  }

  createTable(number: number) {
    let col = []
    for (let i = 0; i < number; i++) {
      let row = [];
      for (let j = 0; j < number; j++) {
        let obj: any = {}
        obj[j] = 0;
        row.push(obj);
      }
      col.push(row);
    }
    return col;
  }

  definValue(obj: any, key: string) {
    return obj[key];
  }

  async turn(row: number, col: number) {
    if (this.isTwoplayer) {
      if (this.table[row][+col][+col] === 0) {
        this.table[row][+col][+col] = this.side;   // O start first
        if (this.winpattern(this.table, this.side)) {
          if (this.side) {// O player
            alert('Player 1 WIN!!!');
            this.reset();
          } else {
            alert('Player 2 WIN!!!');
            this.reset();
          }
        }
        if (this.emptySpace(this.table).length === 0) {
          alert('DRAW');
          this.reset();
        }

        this.side = !this.side

      }
    }
    else {
      if (this.table[row][+col][+col] === 0) {
      this.table[row][+col][+col] = this.human;
      if (this.winpattern(this.table, this.human)) {
        alert('YOU WIN');
        this.reset();
      }
      else if (this.winpattern(this.table, this.computer)) {
        alert('YOU LOOSE');
        this.reset();
      }
      else {
        //let board = this.limitsize(row,col)
        let computerTurn = await this.minimax(this.table, this.computer);
        if (this.emptySpace(this.table).length !== 0) {
          this.table[computerTurn.indexI][computerTurn.indexJ][computerTurn.indexJ] = this.computer;
        }
        else {
          alert('YOU DRAW');
          this.reset();
        }
        if (this.winpattern(this.table, this.human)) {
          alert('YOU WIN');
          this.reset();
        }
        else if (this.winpattern(this.table, this.computer)) {
          alert('YOU LOOSE');
          this.reset();
        }
      }
    }
  }
  }

  isExceed(index: number, change: number) {
    if (change > this.sizenumber - 1) {
      return index;
    }
    else if (change < 0) {
      return index;
    }
    else {
      return change;
    }
  }


  emptySpace(table: any) {
    let emptyArray: any = [];
    for (let i = 0; i < this.sizenumber; i++) {
      let emptyObj: any = {};
      for (let j = 0; j < this.sizenumber; j++) {
        if (table[i][j][j] === 0) {
          emptyObj.indexI = i
          emptyObj.indexJ = j
          emptyArray.push(emptyObj);
        }
        emptyObj = {};
      }
    }
    return emptyArray;
  }

  winpattern(table: any, side: boolean) {
    let isWin = false;
    let isWinArray: any = [];

    //horizontal
    this.header.map((x: string | number) => {
      this.header.map((y: string | number) => {
        isWinArray.push(table[x][y][y]);
      })

      if ((isWinArray.filter((res: boolean) => res !== side)).length === 0) {
        isWin = true;
      }
      isWinArray = [];
    })

    //vertical
    this.header.map((x: string | number) => {
      this.header.map((y: string | number) => {
        isWinArray.push(table[y][x][x]);
      })

      if ((isWinArray.filter((res: boolean) => res !== side)).length === 0) {
        isWin = true;
      }
      isWinArray = [];
    })


    //diagonal 
    for (let x = 0; x < this.sizenumber; x++) {
      isWinArray.push(table[x][x][x]);
    }
    if ((isWinArray.filter((res: boolean) => res !== side)).length === 0) {
      isWin = true;
    }
    isWinArray = [];

    //diagonal 
    let y = this.sizenumber - 1;
    for (let x = 0; x < this.sizenumber; x++) {
      isWinArray.push(table[y - x][x][x]);
    }
    if ((isWinArray.filter((res: boolean) => res !== side)).length === 0) {
      isWin = true;
    }
    isWinArray = [];


    return isWin;
  }

}


