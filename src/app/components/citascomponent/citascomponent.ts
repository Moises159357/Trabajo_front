import { Component } from '@angular/core';
import { Menucomponent } from '../menucomponent/menucomponent';
import { RouterOutlet } from '@angular/router';

@Component({
  imports: [Menucomponent, RouterOutlet],
  selector: 'app-citascomponent',
  styleUrl: './citascomponent.css',
  templateUrl: './citascomponent.html',
})
export class Citascomponent {}
