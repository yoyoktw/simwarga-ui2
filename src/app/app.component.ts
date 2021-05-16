import { Component, OnInit } from '@angular/core';
import { AuthService } from './core/services/auth.service';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
    constructor(private authService: AuthService) {}

    ngOnInit() {}

    doBeforeUnload() {
        // Alert the user window is closing
        // return false;
    }

    doUnload() {
        // Clear session or do something
        // this.authService.logout();
    }
}
