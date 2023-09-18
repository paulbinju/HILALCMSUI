import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewsletterdetailsComponent } from './newsletterdetails.component';

describe('NewsletterdetailsComponent', () => {
  let component: NewsletterdetailsComponent;
  let fixture: ComponentFixture<NewsletterdetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NewsletterdetailsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NewsletterdetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
