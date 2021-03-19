import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ComplainModalComponent } from './complain-modal.component';

describe('ComplainModalComponent', () => {
  let component: ComplainModalComponent;
  let fixture: ComponentFixture<ComplainModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ComplainModalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ComplainModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
