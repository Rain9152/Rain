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
  showLoading = false;

  constructor(private router: Router) {}

  goToWorld(world: number) {
    if (world === 1) {
      this.showLoading = true;
      setTimeout(() => {
        this.showLoading = false;
        this.router.navigateByUrl('/rain');
      }, 950); // Durée du faux chargement plus rapide
    } else {
      this.popupText = 'Under construction!';
      this.showPopup = true;
    }
  }

  closePopup() {
    this.showPopup = false;
  }
}
