import { Component } from '@angular/core';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: []
})
export class AppComponent {
  static title = 'Weeds Away';

  public constructor(private titleService: Title ) { }

  public static setTitle(pageTitle: string) {
    //this.titleService.setTitle(pageTitle + ' - ' + this.title);
  }
}
