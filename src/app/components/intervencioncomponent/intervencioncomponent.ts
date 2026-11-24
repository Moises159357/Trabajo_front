import { Component } from '@angular/core';
import { Menucomponent } from '../menucomponent/menucomponent';
import { RouterOutlet } from '@angular/router';

@Component({
  imports: [Menucomponent, RouterOutlet],
  selector: 'app-intervencioncomponent',
  styleUrl: './intervencioncomponent.css',
  templateUrl: './intervencioncomponent.html',
})
export class Intervencioncomponent {
}
