import { Component } from '@angular/core';
import { ShoppingListComponent } from './components/shopping-list/shopping-list';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [ShoppingListComponent],
  template: `<app-shopping-list></app-shopping-list>`
})
export class AppComponent {}