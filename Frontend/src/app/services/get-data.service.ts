// Servicio unificado para la carga de datos auxiliares de clases
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Categoria } from '../interfaces/categoria';
import { InstructorBasic } from '../interfaces/instructor';
import { Sala } from '../interfaces/sala';
import { CategoriaServices } from './categoria.service';
import { SalaService } from './sala.service';
import { InstructorServiceService } from './instructor-service.service';

@Injectable({
  providedIn: 'root'
})
export class GetDataService {
  constructor(
    private categoriaService: CategoriaServices,
    private salaService: SalaService,
    private instructorService: InstructorServiceService
  ) {}

  // Obtiene el catálogo de categorías
  getCategorias(): Observable<Categoria[]> {
    return this.categoriaService.getCategorias();
  }

  // Obtiene el catálogo de salas
  getSalas(): Observable<Sala[]> {
    return this.salaService.getSalas();
  }

  // Obtiene el catálogo básico de instructores
  getInstructoresBasic(): Observable<InstructorBasic[]> {
    return this.instructorService.getInstructoresBasic();
  }
}
