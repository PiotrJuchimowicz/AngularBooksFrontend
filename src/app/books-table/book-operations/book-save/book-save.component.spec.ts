import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {BookAddComponent} from './book-save.component';
import {HttpClientTestingModule} from '@angular/common/http/testing';

describe('BookAddComponent', () => {
  let component: BookAddComponent;
  let fixture: ComponentFixture<BookAddComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [BookAddComponent],
      imports: [HttpClientTestingModule]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BookAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
