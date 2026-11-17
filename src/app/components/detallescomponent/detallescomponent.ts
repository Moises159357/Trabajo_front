import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Menucomponent } from '../menucomponent/menucomponent';

@Component({
  selector: 'app-detallescomponent',
  standalone: true,
  imports: [Menucomponent, RouterOutlet],
  templateUrl: './detallescomponent.html',
})
export class Detallescomponent {}
