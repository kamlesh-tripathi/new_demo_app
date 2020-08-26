import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ApiResponse } from './api-response';
import { MeetingInfo } from './meetings';
import { UserInfo } from './user-info';

@Injectable()
export class AppserviceService {

  headers = new HttpHeaders();

  myAppUrl: string = "";
  constructor(private _http: HttpClient) {
    this.myAppUrl = "https://localhost:44365/api/";
    this.headers.set('Content-Type', 'application/x-www-form-urlencoded');

  }

  loginUser(userName, password) {
    return this._http.get<ApiResponse>(this.myAppUrl + 'Login/' + userName + '/' + password);
  }

  createMeeting(meeting: MeetingInfo) {
    let url = this.myAppUrl + "Meeting/SetMeeting"
    return this._http.post(url, meeting, { headers: this.headers });
  }

  updateMeeting(meeting: MeetingInfo) {
    let url = this.myAppUrl + "Meeting/UpdateMeetingById"
    return this._http.post(url, meeting, { headers: this.headers });
  }

  deleteeMeeting(meeting: MeetingInfo) {
    let url = this.myAppUrl + "Meeting/DeleteMeetingById"
    return this._http.post(url, meeting, { headers: this.headers });
  }

  getMeetingList() {
    return this._http.get<MeetingInfo[]>(this.myAppUrl + "Meeting/GetMeetings");
  }

  getMeetingListById(meetingId) {
    return this._http.get<MeetingInfo>(this.myAppUrl + "Meeting/GetMeetingById/" + meetingId);
  }

  getUserList() {
    return this._http.get<UserInfo[]>(this.myAppUrl + "Login/LoginInfo");
  }
}
