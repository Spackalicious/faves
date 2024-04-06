import { Component } from '@angular/core';
import { AuthService } from '@auth0/auth0-angular';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {
    // NAVIGATION TOGGLES
    // isUserDropdownOpen: boolean = false;
    isNavbarCollapsed: boolean = true;

    constructor(
      public auth: AuthService
    ) { }

    // toggleUserDropdown() {
    //   this.isUserDropdownOpen = !this.isUserDropdownOpen;
    // }
  
    toggleNavbar() {
      this.isNavbarCollapsed = !this.isNavbarCollapsed;
    }

    loginWithRedirect(): void {
      this.auth.loginWithRedirect();
    }

}
