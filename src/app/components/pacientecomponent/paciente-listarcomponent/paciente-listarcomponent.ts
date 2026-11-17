import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { PacienteDTO } from '../../../models/PacienteDTO';
import { Pacienteservice } from '../../../services/pacienteservice';
import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { RouterLink } from '@angular/router';

@Component({
  imports: [MatTableModule, MatIconModule, MatButtonModule, RouterLink],
  selector: 'app-paciente-listarcomponent',
  styleUrl: './paciente-listarcomponent.css',
  templateUrl: './paciente-listarcomponent.html',
})
export class PacienteListarcomponent implements OnInit{
  displayedColumns: string[]= ['c1', 'c2', 'c3', 'c4', 'c5', 'c6', 'c7', 'c8', 'c9', 'c10', 'c11'];
  dataSource: PacienteDTO[]=[]
  constructor(private sService: Pacienteservice, private cdr: ChangeDetectorRef){}

  ngOnInit(): void {
    this.obtenerPaciente();
  }

  obtenerPaciente(){
    this.sService.getListPaciente().subscribe({
      next: data => {
        this.dataSource = data;
        this.cdr.detectChanges();
      }, error: err =>{
        console.log('Ocurrió un error!!', err);
        this.cdr.detectChanges();
      }
    })
  }

  eliminarPaciente(id:number){
    this.sService.deletePaciente(id).subscribe({
      next:()=>{
        this.obtenerPaciente()
        this.cdr.detectChanges();
      },error:err=>{
        console.log('Ocurrió un error!!', err);
        this.cdr.detectChanges();
      }
    })
  }

}
