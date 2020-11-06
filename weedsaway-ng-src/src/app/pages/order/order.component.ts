import { Component } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import * as data from '../../data/plants.json';

@Component({
   templateUrl: './order.component.html'
})
export class OrderComponent {
   plants: any = (data as any).default;
   plantsSelected: any = [];

   constructor(private cookieService: CookieService) {}

   ngOnInit() {
      if (this.cookieService.check('weedsaway')) {
         this.plantsSelected = JSON.parse(this.cookieService.get('weedsaway'));
      }
   }

   plantsToOrder() {
      var ret = [];
      this.plantsSelected.forEach((item, key) => {
          var next = {};
          next["amt"] = item;
          next["plant"] = this.plants[key];
          if (item > 0) {ret.push(next);}
      });
      return ret;
  }
}