import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ArticledeleteComponent } from './articledelete.component';

describe('ArticledeleteComponent', () => {
  let component: ArticledeleteComponent;
  let fixture: ComponentFixture<ArticledeleteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ArticledeleteComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ArticledeleteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
