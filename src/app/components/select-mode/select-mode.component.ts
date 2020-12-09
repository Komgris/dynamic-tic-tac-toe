import { Component, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-select-mode',
  templateUrl: './select-mode.component.html',
  styleUrls: ['./select-mode.component.css']
})
export class SelectModeComponent implements OnInit {

  isTwoPlayer = false;

  constructor(
    public readonly activeModal: NgbActiveModal
  ) { }

  ngOnInit(): void {
  }

  selectMode(isTwoplayer:boolean){
    this.activeModal.close(isTwoplayer);
  }

}
