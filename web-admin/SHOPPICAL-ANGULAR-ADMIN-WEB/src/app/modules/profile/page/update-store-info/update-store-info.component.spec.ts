import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateStoreInfoComponent } from './update-store-info.component';

describe('UpdateStoreInfoComponent', () => {
  let component: UpdateStoreInfoComponent;
  let fixture: ComponentFixture<UpdateStoreInfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UpdateStoreInfoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdateStoreInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
