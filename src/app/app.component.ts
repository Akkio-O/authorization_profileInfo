import { Component } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';

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
  constructor(private router: Router) {}
  title = 'test_Itentika';
  ngOnInit() {
    this.router.navigate(['/login']);
  }
}