import { SecurityService } from './shared/services/security.service';
import { Component } from '@angular/core';
import { ConfigurationService } from './shared/services/configuration.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'OrderKeeper';
  constructor(
    private configurationService: ConfigurationService
    , private securityService : SecurityService) {
  }

  ngOnInit() {
    console.log('configuration');
    this.configurationService.load();
  }
  isAuthorized() {
    return this.securityService.IsAuthorized;
  }
}
