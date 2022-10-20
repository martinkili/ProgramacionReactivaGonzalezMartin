import { Component, OnDestroy, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Curso } from 'src/app/models/curso';
import { CursoService } from 'src/app/services/curso.service';

@Component({
  selector: 'app-cursos',
  templateUrl: './cursos.component.html',
  styleUrls: ['./cursos.component.css']
})
export class CursosComponent implements OnInit, OnDestroy {

  cursos$!: Observable<Curso[]>
  cursos!: Curso[]

  constructor(
    private cursoService : CursoService
  ) { }

  ngOnInit(): void {
    this.cursos$ = this.cursoService.obtenerCursosObservable();

    this.cursoService.obtenerCursosPromise()
     .then((valor: Curso[]) => {
       this.cursos = valor;
     }).catch((error: any) => {
       console.error(error);
    });
  }

  filtrarCursos(event: any){
    this.cursos$ =  this.cursoService.filtrarCursos(event.target.value)
  }

  ngOnDestroy(): void {
    
  }
}
