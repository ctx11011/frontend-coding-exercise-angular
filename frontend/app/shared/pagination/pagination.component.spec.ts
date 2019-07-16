import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PaginationComponent } from './pagination.component';
import { By } from '@angular/platform-browser';
import { ChangeDetectionStrategy } from '@angular/core';

describe('PaginationComponent', () => {
  let component: PaginationComponent;
  let fixture: ComponentFixture<PaginationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PaginationComponent ]
    })
    .overrideComponent(PaginationComponent, {
      set: {
        changeDetection: ChangeDetectionStrategy.Default
      }
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PaginationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should generate an array of page links', () => {
    component.totalItems = 525;
    expect(component.pages.length).toEqual(6);
  });

  it('should display which page we are on', () => {
    component.totalItems = 250;
    fixture.detectChanges();
    const summary = fixture.debugElement.query(By.css('.summary'));
    expect(summary.nativeElement.textContent).toEqual('Page 1 of 3');
  });

  it('should goto the next page if one is available', () => {
    component.totalItems = 250;
    const spy = jest.spyOn(component.gotoPage, 'emit');
    const next = fixture.debugElement.query(By.css('.next'));
    next.nativeElement.dispatchEvent(new Event('click'));
    expect(spy).toHaveBeenCalledWith(2);
    component.currentPage = 2;
    next.nativeElement.dispatchEvent(new Event('click'));
    expect(spy).toHaveBeenCalledWith(3);
    component.currentPage = 3;
    spy.mockClear();
    next.nativeElement.dispatchEvent(new Event('click'));
    expect(spy).not.toHaveBeenCalled();
  });

  it('should goto the previous page if one is available', () => {
    component.totalItems = 250;
    const spy = jest.spyOn(component.gotoPage, 'emit');
    const next = fixture.debugElement.query(By.css('.prev'));
    next.nativeElement.dispatchEvent(new Event('click'));
    expect(spy).not.toHaveBeenCalled();
    component.currentPage = 2;
    next.nativeElement.dispatchEvent(new Event('click'));
    expect(spy).toHaveBeenCalledWith(1);
  });

  it('should disable the previous page link on the first page', () => {
    component.totalItems = 250;
    const prev = fixture.debugElement.query(By.css('.prev'));
    expect(component.currentPage).toEqual(1);
    expect(prev.nativeElement.classList).toContain('disabled');
    component.currentPage = 2;
    fixture.detectChanges();
    expect(prev.nativeElement.classList).not.toContain('disabled');
  });

  it('should disable the next page link on the last page', () => {
    component.totalItems = 250;
    const next = fixture.debugElement.query(By.css('.next'));
    expect(component.currentPage).toEqual(1);
    expect(next.nativeElement.classList).not.toContain('disabled');
    component.currentPage = 3;
    fixture.detectChanges();
    expect(next.nativeElement.classList).toContain('disabled');
  });
});
