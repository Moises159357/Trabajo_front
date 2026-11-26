import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Menucomponent } from '../menucomponent/menucomponent';

@Component({
  imports: [RouterOutlet, Menucomponent],
  selector: 'app-tratamientocomponent',
  styleUrl: './tratamientocomponent.css',
  templateUrl: './tratamientocomponent.html',
})
export class Tratamientocomponent {
}
