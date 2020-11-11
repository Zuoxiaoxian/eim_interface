import { Component } from '@angular/core';

@Component({
  selector: 'ngx-footer',
  styleUrls: ['./footer.component.scss'],
  template: `
    <span class="created-by">
      Created with ♥ by <b><a href="http://www.mabotech.com/" target="_blank">Mabo</a></b> 2019
    </span>
    <div class="socials">
      <a href="https://github.com/mabotech" target="_blank" class="ion ion-social-github"></a>
      <a href="https://twitter.com/mabotech" target="_blank" class="ion ion-social-twitter"></a>
      <a href="mailto:info@mabotech.com" target="_blank" class="fas fa-envelope"></a>
      <!-- <a href="#" target="_blank" class="ion ion-social-linkedin"></a> -->
      <!-- <a href="https://github.com/mabotech" target="_blank" class="ion ion-social-facebook"></a> -->
    </div>
  `,
})
export class FooterComponent {
}
