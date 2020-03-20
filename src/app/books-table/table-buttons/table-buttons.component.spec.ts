import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {TableButtonsComponent} from './table-buttons.component';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {RouterTestingModule} from '@angular/router/testing';

describe('TableButtonsComponent', () => {
  let component: TableButtonsComponent;
  let fixture: ComponentFixture<TableButtonsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [TableButtonsComponent],
      imports: [HttpClientTestingModule, RouterTestingModule]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TableButtonsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
