import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'NFluentWallet';
  showSplash: any=true;

  constructor() {
    setTimeout(()=>{this.showSplash=false;},1500);
  }
}
