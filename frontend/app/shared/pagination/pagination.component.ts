import { Component, Input, ChangeDetectionStrategy, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PaginationComponent {
  @Input() totalItems: number;
  @Input() pageSize = 100;
  @Input() currentPage = 1;
  @Input() currentPageItems: number;
  @Output() gotoPage: EventEmitter<number> = new EventEmitter();

  get pages(): number[] {
    if (!this.totalItems) {
      return [];
    }
    const totalPages = Math.ceil(this.totalItems / this.pageSize);
    return Array(totalPages)
      .fill(0)
      .map((item, i) => i);
  }

  get isFirstPage(): boolean {
    return this.currentPage === 1;
  }

  get isLastPage(): boolean {
    return this.currentPage === this.pages.length;
  }

  previousPage() {
    if (this.currentPage === 1) {
      return;
    }
    this.gotoPage.emit(this.currentPage - 1);
  }

  nextPage() {
    if (this.currentPage === this.pages.length) {
      return;
    }
    this.gotoPage.emit(this.currentPage + 1);
  }
}
