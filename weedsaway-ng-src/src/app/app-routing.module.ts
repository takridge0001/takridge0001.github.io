import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { StartComponent } from './pages/start/start.component';
import { SelectComponent } from './pages/select/select.component';
import { OrderComponent } from './pages/order/order.component';
import { ThanksComponent } from './pages/thanks/thanks.component';
import { ContactComponent } from './pages/contact/contact.component';

const routes: Routes = [
  {path: '', component: HomeComponent },
  {path: 'start', component: StartComponent },
  {path: 'select/:rowLength/:rowNumber', component: SelectComponent },
  {path: 'order', component: OrderComponent },
  {path: 'thanks', component: ThanksComponent },
  {path: 'contact', component: ContactComponent },
  {path: '**', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
