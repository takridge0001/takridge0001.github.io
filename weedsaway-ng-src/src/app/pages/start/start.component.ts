import { Component } from '@angular/core';

@Component({
   templateUrl: './start.component.html'
})
export class StartComponent {
   public rowNumber = 1;
   public rowLength = 1;
   public selectLink = "/select/1/1";

   updateSelectLink() {
      this.selectLink = "/select/" + this.rowLength + "/" + this.rowNumber;
   }
}