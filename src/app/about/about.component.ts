import { Component, OnInit } from '@angular/core';

declare var brain: any;

@Component({
  selector: 'my-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss']
})
export class AboutComponent implements OnInit {

  constructor() {
    // Do stuff
  }

  private createNeural() : void {
    var net = new brain.NeuralNetwork();
  }

  ngOnInit() {
    this.createNeural();
    console.log('Hello About');
  }

}
