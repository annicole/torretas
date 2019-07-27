import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-pagination-bar',
  templateUrl: './pagination-bar.component.html',
  styleUrls: ['./pagination-bar.component.css']
})
export class PaginationBarComponent implements OnInit {

  @Input() totalItems: number;
  @Output() selectPageOut = new EventEmitter();
  @Input() total:number;
  @Input() pageSize:number;

  totalButtons:number;
  prevDisabled: boolean = true;
  nextDisabled: boolean = false;
  pageNumber: number = 1;
  pageSelected: number = 1;
  lastPage: number = 4;
  botones:any=[];
  pageActive1: boolean = true;
  pageActive2: boolean = false;
  pageActive3: boolean = false;


  constructor() { }

  ngOnInit() {    
  }

  ngOnChanges(){
    this.botones=[];
    let oper = Math.trunc(this.total/this.pageSize);
    let resi = this.total % this.pageSize;
    if(resi > 0){
      //es entero
     oper = oper +1;
    }
    this.totalButtons = oper;
    for(let i=0;i<this.totalButtons;i++){
      this.botones.push({
        pageNumber: i+1
      });
    }
  }

  selectPage(page) {
    this.pageSelected = page.pageNumber;
    this.selectPageOut.emit(page.pageNumber);
  }

  selectPrevPage() {
    if (!this.prevDisabled) {
      this.pageSelected = this.pageSelected - 1;
      this.pageNumber = this.pageNumber - 1 ;
      this.selectPageOut.emit(this.pageSelected);
      this.validatePagination();
    }
  }

  selectNextPage() {
    if (!this.nextDisabled) {
      this.pageSelected = this.pageSelected + 1;
      this.pageNumber = this.pageNumber + 1;
      this.selectPageOut.emit(this.pageSelected);
      this.validatePagination();
    }
  }

  validatePagination() {
    this.prevDisabled = (this.pageNumber === 1) ? true : false;
    this.nextDisabled = (this.pageNumber + 2 === this.lastPage) ? true : false;
  }

}
