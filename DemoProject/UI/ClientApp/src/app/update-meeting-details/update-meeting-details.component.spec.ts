import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateMeetingDetailsComponent } from './update-meeting-details.component';

describe('UpdateMeetingDetailsComponent', () => {
  let component: UpdateMeetingDetailsComponent;
  let fixture: ComponentFixture<UpdateMeetingDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UpdateMeetingDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdateMeetingDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
