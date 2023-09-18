import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdvanceTableComponent } from './advtablelookup.component';

describe('AdvanceTableComponent', () => {
  let component: AdvanceTableComponent;
  let fixture: ComponentFixture<AdvanceTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdvanceTableComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdvanceTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
