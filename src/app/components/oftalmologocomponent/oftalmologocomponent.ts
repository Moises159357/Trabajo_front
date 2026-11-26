import { Component } from '@angular/core';
import { Menucomponent } from '../menucomponent/menucomponent';
import { RouterOutlet } from '@angular/router';

@Component({
  imports: [Menucomponent, RouterOutlet],
  selector: 'app-oftalmologocomponent',
  styleUrl: './oftalmologocomponent.css',
  templateUrl: './oftalmologocomponent.html',
})
export class Oftalmologocomponent {}
