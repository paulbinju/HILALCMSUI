import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ArticlepreviewComponent } from './articlepreview.component';

describe('ArticlepreviewComponent', () => {
  let component: ArticlepreviewComponent;
  let fixture: ComponentFixture<ArticlepreviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ArticlepreviewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ArticlepreviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
