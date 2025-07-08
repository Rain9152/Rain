import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-menu',
  standalone: true,
  imports: [NgIf],
  templateUrl: './menu.html',
  styleUrl: './menu.scss'
})
export class Menu {
  showPopup = false;
  popupText = '';

  constructor(private router: Router) {}

  goToWorld(world: number) {
    if (world === 1) {
      this.router.navigateByUrl('/rain');
    } else {
      this.popupText = 'Monde en travaux !';
      this.showPopup = true;
    }
  }

  closePopup() {
    this.showPopup = false;
  }
}
