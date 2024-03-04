import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'neucipher-frontend';

  toggleNavbarMenu() {
    const menu = document.getElementById('navbarMenu');
    if (menu !== null) {
      menu.style.display = (menu.style.display === 'flex') ? 'none' : 'flex';
    }
  }

}
