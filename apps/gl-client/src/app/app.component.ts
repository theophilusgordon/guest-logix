import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { WelcomeComponent } from './welcome/welcome.component';

@Component({
  standalone: true,
  imports: [WelcomeComponent, RouterModule],
  selector: 'guest-logix-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'gl-client';
}
