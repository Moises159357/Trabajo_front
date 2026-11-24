import { Component } from '@angular/core';
import { Menucomponent } from '../menucomponent/menucomponent';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-recetascomponent',
  imports: [Menucomponent, RouterOutlet],
  templateUrl: './recetascomponent.html',
  styleUrl: './recetascomponent.css',
})
export class Recetascomponent {}