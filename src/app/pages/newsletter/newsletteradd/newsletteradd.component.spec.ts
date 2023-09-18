import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewsletteraddComponent } from './newsletteradd.component';

describe('NewsletteraddComponent', () => {
  let component: NewsletteraddComponent;
  let fixture: ComponentFixture<NewsletteraddComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NewsletteraddComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NewsletteraddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
