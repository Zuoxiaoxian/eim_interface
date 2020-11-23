import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { afterloginurl } from '../../appconfig';

@Component({
  selector: 'ngx-error-page',
  templateUrl: './error-page.component.html',
  styleUrls: ['./error-page.component.scss']
})
export class ErrorPageComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  goToHome() {
    // this.menuService.navigateHome();
    this.router.navigate([afterloginurl])
  }
}
