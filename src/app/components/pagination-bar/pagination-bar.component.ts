import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-pagination-bar',
  templateUrl: './pagination-bar.component.html',
  styleUrls: ['./pagination-bar.component.css']
})
export class PaginationBarComponent implements OnInit {

  @Input() totalItems: number;
  @Output() selectPageOut = new EventEmitter();

  prevDisabled: boolean = true;
  nextDisabled: boolean = false;
  pageNumber: number = 1;
  pageSelected: number = 1;
  lastPage: number = 4;

  pageActive1: boolean = true;
  pageActive2: boolean = false;
  pageActive3: boolean = false;


  constructor() { }

  ngOnInit() {
  }

  selectPage(page) {
    this.pageSelected = page;

    this.pageActive1 = (page === this.pageNumber) ? true : false;
    this.pageActive2 = (page === this.pageNumber + 1) ? true : false;
    this.pageActive3 = (page === this.pageNumber + 2) ? true : false;

    this.selectPageOut.emit(page);
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
