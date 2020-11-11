import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'ngx-device-card',
  templateUrl: './device-card.component.html',
  styleUrls: ['./device-card.component.scss']
})
export class DeviceCardComponent implements OnInit {

  @Input() cardData: any;
  data;
  constructor() { 
  }
  
  ngOnInit(): void {
    this.data = this.cardData
  }

}
