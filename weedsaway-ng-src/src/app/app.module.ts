import { BrowserModule, Title } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './pages/home/home.component';
import { StartComponent } from './pages/start/start.component';
import { SelectComponent } from './pages/select/select.component';
import { OrderComponent } from './pages/order/order.component';
import { MustBePositiveIntegerDirective } from './validators/integerValidation.directive';
import { FormsModule, NG_VALIDATORS } from '@angular/forms';
import { AttributeFilterPipe } from './pipes/attributeFilter.pipe';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    StartComponent,
    SelectComponent,
    OrderComponent,
    MustBePositiveIntegerDirective,
    AttributeFilterPipe
  ],
  imports: [
    AppRoutingModule,
    BrowserModule,
    FormsModule
  ],
  providers: [
    Title,
    {
      provide: NG_VALIDATORS,
      useExisting: MustBePositiveIntegerDirective,
      multi: true
    }
  ],
  exports: [
    MustBePositiveIntegerDirective
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
