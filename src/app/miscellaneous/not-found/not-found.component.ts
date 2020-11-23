import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { afterloginurl } from '../../appconfig';

@Component({
  selector: 'ngx-not-found',
  templateUrl: './not-found.component.html',
  styleUrls: ['./not-found.component.scss']
})
export class NotFoundComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  goToHome() {
    this.router.navigate([afterloginurl])
  }

}
