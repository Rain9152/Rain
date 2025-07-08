import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Rain } from "./rain/rain";
import { Random1 } from "./random1/random1";
import { Menu } from "./menu/menu";

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Rain, Random1, Menu],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  protected title = 'rain';
}
