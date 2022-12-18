import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatListModule } from '@angular/material/list';
import { AdvancedListComponent } from './advanced-list.component';
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatSelectModule} from "@angular/material/select";
import {MatButtonModule} from "@angular/material/button";
import {FormsModule} from "@angular/forms";

@NgModule({
  imports: [MatListModule, CommonModule, MatFormFieldModule, MatSelectModule, MatButtonModule, FormsModule],
  declarations: [AdvancedListComponent],
  providers: [],
  exports: [AdvancedListComponent]
})
export class AdvancedListComponentModule {
}
