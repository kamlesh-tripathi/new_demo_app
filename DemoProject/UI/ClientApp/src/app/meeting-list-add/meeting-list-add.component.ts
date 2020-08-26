import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from "@angular/forms";
import { AppserviceService } from '../appservice.service';
import { Router } from '@angular/router';
import { MeetingInfo } from '../meetings';

@Component({
  selector: 'app-meeting-list-add',
  templateUrl: './meeting-list-add.component.html',
  styleUrls: ['./meeting-list-add.component.css']
})
export class MeetingListAddComponent implements OnInit {

  addForm: FormGroup;
  dropdownList: any[] = [];
  selectedItems = [];
  dropdownSettings = {};
  meetings: MeetingInfo;

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
    this.selectedItems = [];
    this.dropdownSettings = {
      singleSelection: false,
      idField: 'item_id',
      textField: 'item_text',
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      itemsShowLimit: 3,
      allowSearchFilter: true
    };


  }

  onSubmit() {
    this.appserviceService.createMeeting(this.setFromValue())
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
  validateDate() {
    var ndate = new Date(this.addForm.value.meeting_dateTime);
    var date = new Date();
    if (ndate <= date) {
      this.addForm.controls['meeting_dateTime'].setValue('');
    }
  }
  private setFromValue(): MeetingInfo {
    return this.meetings = {
      meetingId: 0,
      meetingSubject: this.addForm.value.meeting_subject,
      meetingAttendees: this.addForm.value.meeting_attendees.map(x => x.item_text).toString(),
      meetingAgenda: this.addForm.value.meeting_agenda,
      meetingDateTime: this.addForm.value.meeting_dateTime,
    };
  }
}
