import { Component, OnInit } from '@angular/core';
import { AppserviceService } from '../appservice.service';
import { Router } from '@angular/router';
import { ApiResponse } from '../api-response';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  username: string
  password: string
  private apirespone: ApiResponse
  constructor(private service: AppserviceService,
    private route: Router) { }


  ngOnInit() {
  }

  login(): void {
    this.service.loginUser(this.username, this.password).subscribe(result => {
      this.apirespone = result
      if (this.apirespone.status === "Success") {
        this.route.navigate(['/AddMeeting'], { queryParams: {}, skipLocationChange: false });
      }
    }, error => console.error(error));


  }
}
