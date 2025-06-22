import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Rain } from "./rain/rain";

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Rain],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  protected title = 'rain';
}
