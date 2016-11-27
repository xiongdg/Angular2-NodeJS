import { Component, OnInit } from '@angular/core';
import { HomeService } from './home.service';

@Component({
  selector: 'my-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor( private homeService: HomeService) {
    // Do stuff
  }

  public onButtonPress(): void {
    this.homeService.sendTestRequest().subscribe(
        (response: any) => {
          console.log(response);
        },
        (errorResp: any) => {
          console.log(errorResp);
        }
    )
  }

  ngOnInit() {
    console.log('Hello Home');
  }

}
