import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-header-table',
  templateUrl: './header-table.component.html',
  styleUrls: ['./header-table.component.scss']
})
export class HeaderTableComponent implements OnInit {
  @Input() public titleHeader;
  @Input() public titleSelect;
  @Input() public renderSelect;
  @Input() public renderButton;
  @Input() public funcionButton;
  @Input() public statuswosubButton;
  @Input() public listNav;
  @Output() buttonOutput = new EventEmitter();
  @Output() searchOutput = new EventEmitter();
  @Output() funcionesOutput = new EventEmitter();
  @Output() statuswosubOutput = new EventEmitter();

  constructor() { }

  ngOnInit() {
  }

  onSearchChange(searchValue: string){
    this.searchOutput.emit(searchValue);
  }

  onClickButon(){
    this.buttonOutput.emit();
  }
  onClickFunciones(){
    this.funcionesOutput.emit();
  }

  onClickStatuswosub() {
    this.statuswosubOutput.emit();
  }

}
