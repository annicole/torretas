import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-header-table',
  templateUrl: './header-table.component.html',
  styleUrls: ['./header-table.component.scss']
})
export class HeaderTableComponent implements OnInit {
  @Input() public titleHeader;
  @Input() public titleSelect;
  @Output() buttonOutput = new EventEmitter();
  @Output() searchOutput = new EventEmitter();

  constructor() { }

  ngOnInit() {
  }

  onSearchChange(searchValue: string){
    this.searchOutput.emit(searchValue);
  }

  onClickButon(){
    this.buttonOutput.emit();
  }
}
