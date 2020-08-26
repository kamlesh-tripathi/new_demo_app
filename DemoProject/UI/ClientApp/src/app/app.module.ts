import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { AppserviceService } from './appservice.service';
import { MeetingListComponent } from './meeting-list/meeting-list.component';
import { MeetingListAddComponent } from './meeting-list-add/meeting-list-add.component';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
import { UpdateMeetingDetailsComponent } from './update-meeting-details/update-meeting-details.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent, MeetingListComponent, MeetingListAddComponent, UpdateMeetingDetailsComponent
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'ng-cli-universal' }),
    HttpClientModule,
    NgMultiSelectDropDownModule.forRoot(),
    FormsModule, ReactiveFormsModule,
    RouterModule.forRoot([
      { path: '', component: LoginComponent, pathMatch: 'full' },
      { path: 'MeetingList', component: MeetingListComponent },
      { path: 'AddMeeting', component: MeetingListAddComponent },
      { path: 'EditMeeting', component: UpdateMeetingDetailsComponent },
    ])
  ],
  providers: [AppserviceService],
  bootstrap: [AppComponent]
})
export class AppModule { }
