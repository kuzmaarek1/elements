import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { AppComponent } from './app.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, AppComponent],
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App {
  protected title = 'elements';
}
