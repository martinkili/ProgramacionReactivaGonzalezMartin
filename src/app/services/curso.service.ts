import { Injectable } from '@angular/core';
import { BehaviorSubject, map, observable, Observable } from 'rxjs';
import { Curso } from '../models/curso';

@Injectable({
  providedIn: 'root'
})

export class CursoService {

  cursos: Curso[] = [{
    nombre: 'angular',
    comision: '32320',
    profesor: 'Martin',
    fechaInicio: new Date(),
    fechaFin: new Date()
  },{
    nombre: 'reactjs',
    comision: '32320',
    profesor: 'Mauricio',
    fechaInicio: new Date(),
    fechaFin: new Date()
  },{
    nombre: 'kotlin',
    comision: '32320',
    profesor: 'Maite',
    fechaInicio: new Date(),
    fechaFin: new Date()
  }];

  cursos$: Observable<Curso[]>;

  constructor() { 

    this.cursos$ = new Observable<Curso[]>((suscriptor) => {
      suscriptor.next(this.cursos);
    })

  }

  obtenerCursosPromise(): Promise<Curso[] | any>{
    return new Promise((resolve, reject) => {
      if(this.cursos.length > 0){
        resolve(this.cursos);
      }else{
        reject({
          codigo: 0,
          mensaje: 'No hay cursos disponibles en este momento'
        });
      }
    });
  }

  obtenerCursosObservable(){
    return this.cursos$
  }

  filtrarCursos(nombre: string){

    return this.obtenerCursosObservable().pipe(
      map((cursos: Curso[]) => cursos.filter((curso: Curso) => curso.nombre.includes(nombre)))
    )
    
  }
}
