import { Component, OnInit } from '@angular/core';
import { MeetingInfo } from '../meetings';
import { AppserviceService } from '../appservice.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-meeting-list',
  templateUrl: './meeting-list.component.html',
  styleUrls: ['./meeting-list.component.css']
})
export class MeetingListComponent implements OnInit {
  meetings: MeetingInfo[];
  meetingInfo: MeetingInfo;
  constructor(private appserviceService: AppserviceService,
    private route: Router) { }

  ngOnInit() {
    this.loadMeeting();    
  }

  loadMeeting() {
    this.appserviceService.getMeetingList()
    .subscribe((data: MeetingInfo[]) => {
      this.meetings = data;
    });
  }

  editEmp(meetingId): void {
    localStorage.removeItem('meetingId');
    localStorage.setItem('meetingId', meetingId);
    this.route.navigate(['EditMeeting']);
  }

  deleteEmp(meetingId): void {
    this.appserviceService.deleteeMeeting(this.setFromValue(meetingId))
      .subscribe(data => {
        this.loadMeeting();    
      },
        error => {
          alert(error);
        });
  }

  backButton(): void {
    this.route.navigate(['/AddMeeting']);
  }

  private setFromValue(meetingId): MeetingInfo {
    return this.meetingInfo = {
      meetingId: meetingId,
      meetingSubject: "",
      meetingAttendees: "",
      meetingAgenda: "",
      meetingDateTime: new Date
    };
  }
}
