import { Component } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  showHomeNavOptions: boolean = false;
  showBackground: boolean = false;
  title = 'neucipher-frontend';

  constructor(private router: Router) {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.showHomeNavOptions = (event.url === '/' || event.url === '/home');
        this.showBackground = this.showHomeNavOptions;
      }
    });
  }
}


  /*toggleNavbarMenu() {
    const menu = document.getElementById('navbarMenu');
    if (menu !== null) {
      menu.style.display = (menu.style.display === 'flex') ? 'none' : 'flex';
    }
  }

}*/
