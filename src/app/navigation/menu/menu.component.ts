import { Component } from '@angular/core';
import { LocalStorageUtils } from 'src/app/utils/localstorage';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html'
})
export class MenuComponent {

  public isCollapsed: boolean;
  
  constructor() {
    this.isCollapsed = true;
  }

  localStorageUtils = new LocalStorageUtils();
  
  isUserLogged(): boolean {
    return this.localStorageUtils.getUserToken() !== null;
  }

}
