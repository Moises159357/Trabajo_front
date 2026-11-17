import { Component } from '@angular/core';
import { Menucomponent } from '../menucomponent/menucomponent';
import { RouterOutlet } from '@angular/router';

@Component({
  imports: [Menucomponent,RouterOutlet],
  selector: 'app-pacientecomponent',
  styleUrl: './pacientecomponent.css',
  templateUrl: './pacientecomponent.html',
})
export class Pacientecomponent {}
