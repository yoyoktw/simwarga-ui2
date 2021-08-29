import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { NgbAlertModule, NgbCarouselModule } from '@ng-bootstrap/ng-bootstrap';
import { PageHeaderModule, StatModule } from '../../shared';
import { ChatComponent, NotificationComponent, TimelineComponent } from './components';
import { ChartsModule } from 'ng2-charts';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardComponent } from './dashboard.component';

@NgModule({
    imports: [CommonModule, NgbCarouselModule, NgbAlertModule, DashboardRoutingModule, StatModule, ChartsModule, PageHeaderModule],
    declarations: [DashboardComponent, TimelineComponent, NotificationComponent, ChatComponent]
})
export class DashboardModule {}
