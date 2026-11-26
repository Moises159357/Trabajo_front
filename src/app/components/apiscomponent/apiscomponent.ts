import { Component } from '@angular/core';
import { Menucomponent } from '../menucomponent/menucomponent';
import { RouterOutlet } from '@angular/router';

@Component({
  imports: [Menucomponent, RouterOutlet],
  selector: 'app-apiscomponent',
  styleUrl: './apiscomponent.css',
  templateUrl: './apiscomponent.html',
})
export class Apiscomponent {}
