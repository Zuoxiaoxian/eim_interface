import { Component, OnInit } from '@angular/core';
import { DatePipe } from '@angular/common'; 

@Component({
  selector: 'ngx-date-range',
  templateUrl: './date-range.component.html',
  styleUrls: ['./date-range.component.scss']
})
export class DateRangeComponent implements OnInit {

  public selectedMoments = [
    new Date(2018, 1, 12, 10, 30),
    new Date(2018, 3, 21, 20, 30)
  ];

  constructor(private datepipe: DatePipe) { }

  ngOnInit(): void {
  }

  getselect(){
    var date_list = [this.datepipe.transform(this.selectedMoments[0],'yyyy-MM-dd'), this.datepipe.transform(this.selectedMoments[1],'yyyy-MM-dd')];
    return date_list;
  }

}
