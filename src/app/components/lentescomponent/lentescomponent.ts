import { Component } from '@angular/core';
import { Menucomponent } from '../menucomponent/menucomponent';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-lentescomponent',
  imports: [Menucomponent, RouterOutlet],
  templateUrl: './lentescomponent.html',
  styleUrl: './lentescomponent.css',
})
export class Lentescomponent {}