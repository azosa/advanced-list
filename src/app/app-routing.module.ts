import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AdvancedListComponent } from './components/advanced-list/advanced-list.component';
import { AdvancedListComponentModule } from './components/advanced-list/advanced-list.component-module';
import { JobsServiceModule } from './services/jobs.service-module';

@NgModule({
  imports: [RouterModule.forRoot([{ path: 'advanced-list', component: AdvancedListComponent }]), AdvancedListComponentModule, JobsServiceModule],
  exports: [RouterModule]
})
export class AppRoutingModule { }
