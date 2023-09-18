import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewsletterviewComponent } from './newsletterview.component';

describe('NewsletterviewComponent', () => {
  let component: NewsletterviewComponent;
  let fixture: ComponentFixture<NewsletterviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NewsletterviewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NewsletterviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
