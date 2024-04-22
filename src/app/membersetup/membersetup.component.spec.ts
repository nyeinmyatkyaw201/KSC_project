import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MembersetupComponent } from './membersetup.component';

describe('MembersetupComponent', () => {
  let component: MembersetupComponent;
  let fixture: ComponentFixture<MembersetupComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MembersetupComponent]
    });
    fixture = TestBed.createComponent(MembersetupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
