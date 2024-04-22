import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegistractionMemberComponent } from './registraction-member.component';

describe('RegistractionMemberComponent', () => {
  let component: RegistractionMemberComponent;
  let fixture: ComponentFixture<RegistractionMemberComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RegistractionMemberComponent]
    });
    fixture = TestBed.createComponent(RegistractionMemberComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
