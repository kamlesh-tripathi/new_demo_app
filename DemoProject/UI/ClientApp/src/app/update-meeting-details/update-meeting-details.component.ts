import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from "@angular/forms";
import { AppserviceService } from '../appservice.service';
import { Router } from '@angular/router';
import { MeetingInfo } from '../meetings';
import { forEach } from '@angular/router/src/utils/collection';

@Component({
  selector: 'app-update-meeting-details',
  templateUrl: './update-meeting-details.component.html',
  styleUrls: ['./update-meeting-details.component.css']
})
export class UpdateMeetingDetailsComponent implements OnInit {

  addForm: FormGroup;
  dropdownList: any[] = [];
  selectedItems = {};
  dropdownSettings = {};
  meetings: MeetingInfo;
  meetingId: any;
  meeting_attendees: {};
  constructor(private formBuilder: FormBuilder,
    private appserviceService: AppserviceService,
    private route: Router) { }

  ngOnInit() {
    this.addForm = this.formBuilder.group({
      meeting_subject: ['', [Validators.required, Validators.maxLength(50)]],
      meeting_agenda: ['', [Validators.required, Validators.maxLength(500)]],
      meeting_dateTime: ['', [Validators.required]],
      meeting_attendees: ['', [Validators.required]],
    });

    this.bindUser();
    this.dropdownSettings = {
      singleSelection: false,
      idField: 'item_id',
      textField: 'item_text',
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      itemsShowLimit: 3,
      allowSearchFilter: true
    };
    this.editMeetingInfo();
  }

  editMeetingInfo() {
    this.meetingId = localStorage.getItem('meetingId');
    this.appserviceService.getMeetingListById(this.meetingId).subscribe(data => {
      var result = {
        meeting_subject: data.meetingSubject,
        meeting_agenda: data.meetingAgenda,
        meeting_dateTime: data.meetingDateTime,
        meetingAttendees: data.meetingAttendees
      }
      this.addForm.patchValue(result);
      this.selectedItems = data.meetingAttendees.split(',').map(function (item) {
        return { item_id: item, item_text: item};
      });
    })
  }
  validateDate() {
    var ndate = new Date(this.addForm.value.meeting_dateTime);
    var date = new Date();
    if (ndate <= date) {
      this.addForm.controls['meeting_dateTime'].setValue('');
    }
  }
  onUpdate() {
    this.appserviceService.updateMeeting(this.setFromValue())
      .subscribe(data => {
        this.route.navigate(['/MeetingList'], { queryParams: {}, skipLocationChange: false });
      },
        error => {
          alert(error);
        });
  }

  public bindUser() {
    this.appserviceService.getUserList()
      .subscribe(data => {
        this.dropdownList = data.map(function (item) {
          return { item_id: item.name, item_text: item.name };
        });
      },
        error => {
          alert(error);
        });
  }

  private setFromValue(): MeetingInfo {
    return this.meetings = {
      meetingId: this.meetingId,
      meetingSubject: this.addForm.value.meeting_subject,
      meetingAttendees: this.addForm.value.meeting_attendees.map(x => x.item_text).toString(),
      meetingAgenda: this.addForm.value.meeting_agenda,
      meetingDateTime: this.addForm.value.meeting_dateTime,
    };
  }
}
