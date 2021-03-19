import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { StorageMap } from '@ngx-pwa/local-storage';
import { TranslateService } from '@ngx-translate/core';
import { StorageConstants } from '../../../shared/constants/storage.constants';
import { UserDto } from '../../../core/dto/user.dto';
import { AuthService } from '../../../core/services/auth.service';

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
    public pushRightClass: string;
    public username: String;

    constructor(private translate: TranslateService,
                public router: Router,
                private authService: AuthService,
                private storage: StorageMap) {
        // tslint:disable-next-line: deprecation
        this.router.events.subscribe((val) => {
            if (val instanceof NavigationEnd && window.innerWidth <= 992 && this.isToggled()) {
                this.toggleSidebar();
            }
        });
    }

    ngOnInit() {
        this.pushRightClass = 'push-right';
        // tslint:disable-next-line: deprecation
        this.storage.get(StorageConstants.CURRENT_USER).subscribe((currentUser: UserDto) => {
            if (currentUser !== undefined) {
                this.username = currentUser.username ? currentUser.username : currentUser.email;
            }
        });
    }

    isToggled(): boolean {
        const dom: Element = document.querySelector('body');
        return dom.classList.contains(this.pushRightClass);
    }

    toggleSidebar() {
        const dom: any = document.querySelector('body');
        dom.classList.toggle(this.pushRightClass);
    }

    rltAndLtr() {
        const dom: any = document.querySelector('body');
        dom.classList.toggle('rtl');
    }

    onLoggedout() {
        this.authService.logout();
    }

    changeLang(language: string) {
        this.translate.use(language);
    }
}
