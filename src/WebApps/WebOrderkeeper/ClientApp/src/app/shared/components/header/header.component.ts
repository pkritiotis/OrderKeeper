import { Component, OnInit } from '@angular/core';
import { SecurityService } from '../../services/security.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor(private _securityService: SecurityService, private router: Router) {
  }

  ngOnInit() {
  }

  Logout() {
    this._securityService.Logoff();
    window.location.href = '/';
  }

}
