import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  imports: [RouterOutlet],
  selector: 'app-root',
  styleUrl: './app.css',
  templateUrl: './app.html',
})
export class App {
<<<<<<< HEAD
  protected readonly title = signal('frontend-app');
=======
  protected readonly title = signal('OPTICVISION');
>>>>>>> origin/Edward_Gonzales
}
