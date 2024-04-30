import { Component } from '@angular/core';
import { Router, NavigationEnd, Event as RouterEvent} from '@angular/router';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  isHomePage: boolean = true; 
  title = 'neucipher-frontend';
  isDashboard: boolean = false;

  constructor(private router: Router) {
    this.router.events.pipe(
      filter((event: RouterEvent): event is NavigationEnd => event instanceof NavigationEnd)
    ).subscribe((event: NavigationEnd) => {
      // Update isHomePage based on the current URL
      this.isHomePage = event.url === '/' || event.url === '/home';
      this.isDashboard = event.url ==='/patientdashboard' || event.url === '/doctordashboard'
    });
  }

  logout() {
    localStorage.removeItem('token');
    this.router.navigate(['/']);
  }
}


  /*toggleNavbarMenu() {
    const menu = document.getElementById('navbarMenu');
    if (menu !== null) {
      menu.style.display = (menu.style.display === 'flex') ? 'none' : 'flex';
    }
  }

}*/
