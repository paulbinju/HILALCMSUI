import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewsletterdeleteComponent } from './newsletterdelete.component';

describe('NewsletterdeleteComponent', () => {
  let component: NewsletterdeleteComponent;
  let fixture: ComponentFixture<NewsletterdeleteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NewsletterdeleteComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NewsletterdeleteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
