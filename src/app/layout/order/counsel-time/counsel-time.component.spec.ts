import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CounselTimeComponent } from './counsel-time.component';

describe('CounselTimeComponent', () => {
  let component: CounselTimeComponent;
  let fixture: ComponentFixture<CounselTimeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CounselTimeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CounselTimeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
