import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  styleUrls: ['./app.component.scss'],
  template: `
      <router-outlet></router-outlet>
  `,
})
export class AppComponent {
  title = 'test_Itentika';
}