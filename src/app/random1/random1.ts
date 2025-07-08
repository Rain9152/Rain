import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-random1',
  standalone: true,
  templateUrl: './random1.html',
  styleUrl: './random1.scss'
})
export class Random1 {
  @Input() rave = false;
}
