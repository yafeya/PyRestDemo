import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'app';

  private mShowAnimates: boolean = false;

  get ShowAnimates(): boolean {
    return this.mShowAnimates;
  }

  set ShowAnimates(value: boolean) {
    this.mShowAnimates = value;
  }
}
