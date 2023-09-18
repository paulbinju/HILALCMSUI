import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ArticleextensionComponent } from './articleextension.component';

describe('ArticleextensionComponent', () => {
  let component: ArticleextensionComponent;
  let fixture: ComponentFixture<ArticleextensionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ArticleextensionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ArticleextensionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
