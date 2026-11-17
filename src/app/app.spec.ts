import { TestBed } from '@angular/core/testing';
<<<<<<< HEAD
import { provideRouter } from '@angular/router';
=======
>>>>>>> origin/Edward_Gonzales
import { App } from './app';

describe('App', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [App],
<<<<<<< HEAD
      providers: [provideRouter([])],
    }).compileComponents();
=======
    })
      .compileComponents();
>>>>>>> origin/Edward_Gonzales
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(App);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

<<<<<<< HEAD
=======
  it('should render title', async () => {
    const fixture = TestBed.createComponent(App);
    await fixture.whenStable();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('h1')?.textContent).toContain('Hello, OPTICVISION');
  });
>>>>>>> origin/Edward_Gonzales
});
