import { Component } from '@angular/core';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import {MatMenuModule} from '@angular/material/menu';
import { RouterLink } from '@angular/router';

@Component({
  imports: [MatToolbarModule, MatButtonModule, MatIconModule, MatMenuModule, RouterLink],
  selector: 'app-menucomponent',
  styleUrl: './menucomponent.css',
  templateUrl: './menucomponent.html',
})
export class Menucomponent {}
