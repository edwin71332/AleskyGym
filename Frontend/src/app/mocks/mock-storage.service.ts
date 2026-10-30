// Servicio de almacenamiento simulado para modo demo con soporte de persistencia local
import { Injectable } from '@angular/core';
import { Categoria } from '../interfaces/categoria';
import { Especialidad } from '../interfaces/especialidad';
import { Sala } from '../interfaces/sala';
import { Instructor, InstructorBasic } from '../interfaces/instructor';
import { Cliente } from '../interfaces/cliente';
import { ClasesTabla } from '../interfaces/Clase-tabla';
import { ClaseDisponible } from '../interfaces/clase-disponible';
import { inscripcionClases } from '../interfaces/inscripcionClases';
import { PageResponse } from '../interfaces/pageresponse';
import { PagedResponse } from '../services/clase.service';
import { UsuarioModal } from '../services/cliente.service';
import {
  CATEGORIAS_MOCK,
  ESPECIALIDADES_MOCK,
  SALAS_MOCK,
  INSTRUCTORES_MOCK,
  CLIENTES_MOCK,
  CLASES_MOCK,
  INSCRIPCIONES_MOCK,
  UsuarioMock,
  ClaseMock,
  InscripcionMock
} from './mock-data';

@Injectable({
  providedIn: 'root'
})
export class MockStorageService {
  private readonly STORAGE_PREFIX = 'alesky_gym_';

  private categorias: Categoria[] = [];
  private especialidades: Especialidad[] = [];
  private salas: Sala[] = [];
  private instructores: Instructor[] = [];
  private clientes: UsuarioMock[] = [];
  private clases: ClaseMock[] = [];
  private inscripciones: InscripcionMock[] = [];

  constructor() {
    this.cargarDatos();
  }

  // Carga inicial desde localStorage o desde los datos por defecto
  private cargarDatos(): void {
    this.categorias = this.obtenerDeStorage('categorias', CATEGORIAS_MOCK);
    this.especialidades = this.obtenerDeStorage('especialidades', ESPECIALIDADES_MOCK);
    this.salas = this.obtenerDeStorage('salas', SALAS_MOCK);
    this.instructores = this.obtenerDeStorage('instructores', INSTRUCTORES_MOCK);
    this.clientes = this.obtenerDeStorage('clientes', CLIENTES_MOCK);
    this.clases = this.obtenerDeStorage('clases', CLASES_MOCK);
    this.inscripciones = this.obtenerDeStorage('inscripciones', INSCRIPCIONES_MOCK);
  }

  private obtenerDeStorage<T>(clave: string, valorPorDefecto: T): T {
    try {
      if (typeof window !== 'undefined' && window.localStorage) {
        const item = window.localStorage.getItem(this.STORAGE_PREFIX + clave);
        if (item) {
          return JSON.parse(item);
        }
      }
    } catch (e) {
      console.warn(`No se pudo leer ${clave} desde localStorage:`, e);
    }
    return JSON.parse(JSON.stringify(valorPorDefecto));
  }

  private guardarEnStorage(clave: string, valor: any): void {
    try {
      if (typeof window !== 'undefined' && window.localStorage) {
        window.localStorage.setItem(this.STORAGE_PREFIX + clave, JSON.stringify(valor));
      }
    } catch (e) {
      console.warn(`No se pudo guardar ${clave} en localStorage:`, e);
    }
  }

  // Utilidad de paginación
  private paginar<T>(elementos: T[], page: number, size: number): PageResponse<T> {
    const pagina = Math.max(0, page || 0);
    const tamano = Math.max(1, size || 10);
    const totalElements = elementos.length;
    const totalPages = Math.ceil(totalElements / tamano) || 1;
    const inicio = pagina * tamano;
    const content = elementos.slice(inicio, inicio + tamano);

    return {
      content,
      totalElements,
      totalPages,
      number: pagina,
      size: tamano,
      first: pagina === 0,
      last: pagina >= totalPages - 1,
      empty: content.length === 0
    };
  }

  // Métodos de Categorías
  getCategorias(): Categoria[] {
    return [...this.categorias];
  }

  getCategoriasPaginadas(page: number, size: number): PageResponse<Categoria> {
    return this.paginar(this.categorias, page, size);
  }

  addCategoria(categoria: Partial<Categoria>): Categoria {
    const nuevoId = this.categorias.length > 0
      ? Math.max(...this.categorias.map(c => c.id_categoria || 0)) + 1
      : 1;

    const nueva: Categoria = {
      id_categoria: nuevoId,
      nombre: categoria.nombre || 'Nueva Categoría',
      color: categoria.color || '#3b82f6'
    };

    this.categorias.push(nueva);
    this.guardarEnStorage('categorias', this.categorias);
    return nueva;
  }

  // Métodos de Especialidades
  getEspecialidades(): Especialidad[] {
    return [...this.especialidades];
  }

  getEspecialidadesPaginadas(page: number, size: number): PageResponse<Especialidad> {
    return this.paginar(this.especialidades, page, size);
  }

  addEspecialidad(especialidad: Partial<Especialidad>): Especialidad {
    const nuevoId = this.especialidades.length > 0
      ? Math.max(...this.especialidades.map(e => e.id_especialidad || 0)) + 1
      : 1;

    const nueva: Especialidad = {
      id_especialidad: nuevoId,
      nombre: especialidad.nombre || 'Nueva Especialidad'
    };

    this.especialidades.push(nueva);
    this.guardarEnStorage('especialidades', this.especialidades);
    return nueva;
  }

  // Métodos de Salas
  getSalas(): Sala[] {
    return [...this.salas];
  }

  addSala(sala: Partial<Sala>): Sala {
    const nuevoId = this.salas.length > 0
      ? Math.max(...this.salas.map(s => s.id_sala || 0)) + 1
      : 1;

    const nueva: Sala = {
      id_sala: nuevoId,
      nombre: sala.nombre || 'Nueva Sala',
      descripcion: sala.descripcion || '',
      capacidad: Number(sala.capacidad) || 15,
      estado: sala.estado || 'Disponible',
      id_categoria: Number(sala.id_categoria) || 1
    };

    this.salas.push(nueva);
    this.guardarEnStorage('salas', this.salas);
    return nueva;
  }

  // Métodos de Instructores
  getInstructores(): Instructor[] {
    return [...this.instructores];
  }

  getInstructoresBasic(): InstructorBasic[] {
    return this.instructores.map(i => ({
      id: i.id_instructor,
      nombre: i.nombre,
      apellido: i.apellido,
      especialidades: i.especialidades || []
    }));
  }

  getInstructoresPaginados(page: number, size: number): PageResponse<Instructor> {
    return this.paginar(this.instructores, page, size);
  }

  addInstructor(instructor: any): Instructor {
    const nuevoId = this.instructores.length > 0
      ? Math.max(...this.instructores.map(i => i.id_instructor || 0)) + 1
      : 1;

    const especialidadesNombres: string[] = [];
    if (Array.isArray(instructor.especialidades)) {
      instructor.especialidades.forEach((idEsp: any) => {
        const esp = this.especialidades.find(e => e.id_especialidad === Number(idEsp));
        if (esp) especialidadesNombres.push(esp.nombre);
      });
    }

    const nuevo: Instructor = {
      id_instructor: nuevoId,
      nombre: instructor.nombre || '',
      apellido: instructor.apellido || '',
      telefono: instructor.telefono || '',
      correo: instructor.correo || '',
      cedula: Number(instructor.cedula) || 0,
      instructorEspecialidades: especialidadesNombres.map((nombre, index) => ({
        id_Instruespecial: index + 1,
        especialidad: { id_especialidad: index + 1, nombre }
      })),
      especialidades: especialidadesNombres,
      especialidad: especialidadesNombres.join(', ')
    };

    this.instructores.push(nuevo);
    this.guardarEnStorage('instructores', this.instructores);
    return nuevo;
  }

  updateInstructor(id: number, dto: any): Instructor {
    const index = this.instructores.findIndex(i => i.id_instructor === Number(id));
    if (index !== -1) {
      this.instructores[index] = {
        ...this.instructores[index],
        ...dto,
        id_instructor: Number(id)
      };
      this.guardarEnStorage('instructores', this.instructores);
      return this.instructores[index];
    }
    return dto;
  }

  // Métodos de Clientes
  getClientesPaginados(page: number, size: number): PageResponse<Cliente> {
    const clientesFormateados: Cliente[] = this.clientes.map(c => ({
      nombre: c.nombre,
      apellido: c.apellido,
      cedula: c.cedula,
      correo: c.correo,
      telefono: c.telefono
    }));
    return this.paginar(clientesFormateados, page, size);
  }

  getClientesModal(): UsuarioModal[] {
    return this.clientes.map(c => ({
      id_usuario: c.id_usuario,
      nombre: c.nombre,
      apellido: c.apellido,
      cedula: c.cedula
    }));
  }

  addCliente(cliente: Partial<Cliente>): any {
    const nuevoId = this.clientes.length > 0
      ? Math.max(...this.clientes.map(c => c.id_usuario || 0)) + 1
      : 1;

    const nuevo: UsuarioMock = {
      id_usuario: nuevoId,
      nombre: cliente.nombre || '',
      apellido: cliente.apellido || '',
      cedula: cliente.cedula || '',
      correo: cliente.correo || '',
      telefono: cliente.telefono || ''
    };

    this.clientes.push(nuevo);
    this.guardarEnStorage('clientes', this.clientes);
    return {
      message: 'Usuario registrado con éxito',
      ...nuevo
    };
  }

  // Métodos de Clases
  getClasesPaginadas(page: number, size: number): PagedResponse<ClasesTabla> {
    const pagina = Math.max(0, page || 0);
    const tamano = Math.max(1, size || 10);
    const totalElements = this.clases.length;
    const totalPages = Math.ceil(totalElements / tamano) || 1;
    const inicio = pagina * tamano;
    const clasesPaginadas = this.clases.slice(inicio, inicio + tamano);

    const content: ClasesTabla[] = clasesPaginadas.map(clase => {
      const instructor = this.instructores.find(i => i.id_instructor === clase.id_instructor);
      const categoria = this.categorias.find(c => c.id_categoria === clase.id_categoria);
      const sala = this.salas.find(s => s.id_sala === clase.id_sala);

      const horario = (clase.hora_inicio && clase.hora_final)
        ? [clase.hora_inicio, clase.hora_final]
        : undefined;

      return {
        id: clase.id_clase,
        nombre: clase.nombre,
        capacidad: clase.capacidad,
        instructor: instructor ? `${instructor.nombre} ${instructor.apellido}` : 'Sin asignar',
        categoria: categoria ? categoria.nombre : 'General',
        categoriaColor: categoria?.color || '#3b82f6',
        sala: sala ? sala.nombre : 'Sin sala',
        fechaInicio: clase.fecha_inicio || 'Sin fecha',
        fechaFinal: clase.fecha_final || 'Sin fecha',
        horario,
        duracion: clase.duracion ? `${clase.duracion} min` : undefined,
        estado: clase.estado || 'Disponible'
      };
    });

    return {
      content,
      totalElements,
      totalPages,
      size: tamano,
      number: pagina
    };
  }

  getClasesDisponibles(): ClaseDisponible[] {
    return this.clases
      .filter(clase => (clase.estado || '').toLowerCase() === 'disponible')
      .map(clase => {
        const instructor = this.instructores.find(i => i.id_instructor === clase.id_instructor);
        const categoria = this.categorias.find(c => c.id_categoria === clase.id_categoria);
        const sala = this.salas.find(s => s.id_sala === clase.id_sala);

        return {
          id: clase.id_clase,
          nombre: clase.nombre,
          descripcion: clase.descripcion,
          fechaInicio: clase.fecha_inicio || '2026-11-01',
          fechaFinal: clase.fecha_final || '2026-11-30',
          hora_inicio: clase.hora_inicio || '08:00:00',
          duracion: clase.duracion || 60,
          capacidad: clase.capacidad,
          estado: clase.estado || 'Disponible',
          instructor: instructor ? `${instructor.nombre} ${instructor.apellido}` : 'Instructor asignado',
          categoria: categoria ? categoria.nombre : 'General',
          sala: sala ? sala.nombre : 'Sala principal'
        };
      });
  }

  addClase(clase: any): any {
    const nuevoId = this.clases.length > 0
      ? Math.max(...this.clases.map(c => c.id_clase || 0)) + 1
      : 1;

    const nueva: ClaseMock = {
      id_clase: nuevoId,
      nombre: clase.nombre || 'Nueva Clase',
      descripcion: clase.descripcion || '',
      capacidad: Number(clase.capacidad) || 15,
      estado: 'Disponible',
      id_instructor: Number(clase.id_instructor) || 86,
      id_categoria: Number(clase.id_categoria) || 1,
      id_sala: Number(clase.id_sala) || 14,
      fecha_inicio: clase.fecha_inicio || '2026-11-01',
      fecha_final: clase.fecha_final || '2026-11-30',
      hora_inicio: clase.hora_inicio || '08:00:00',
      hora_final: clase.hora_final || '09:00:00',
      duracion: Number(clase.duracion) || 60
    };

    this.clases.push(nueva);
    this.guardarEnStorage('clases', this.clases);
    return {
      ...nueva,
      id_instructor: String(nueva.id_instructor),
      id_categoria: String(nueva.id_categoria),
      id_sala: String(nueva.id_sala)
    };
  }

  asignarHorario(payload: {
    idClase: number;
    fechaInicio: string;
    fechaFinal: string;
    horaInicio: string;
    horaFin: string;
    duracion: number;
  }): any {
    const index = this.clases.findIndex(c => c.id_clase === Number(payload.idClase));
    if (index !== -1) {
      this.clases[index].fecha_inicio = payload.fechaInicio;
      this.clases[index].fecha_final = payload.fechaFinal;
      this.clases[index].hora_inicio = payload.horaInicio;
      this.clases[index].hora_final = payload.horaFin;
      this.clases[index].duracion = payload.duracion;
      this.guardarEnStorage('clases', this.clases);
      return { message: 'Horario asignado exitosamente' };
    }
    return { message: 'Clase no encontrada' };
  }

  // Métodos de Inscripciones
  getInscripcionesIds(): inscripcionClases[] {
    return this.inscripciones.map(i => ({
      idInscripcion: i.idInscripcion,
      idClase: i.idClase
    }));
  }

  inscribirCliente(idUsuario: number, idClase: number): { success: boolean; message: string } {
    const yaInscrito = this.inscripciones.some(
      i => i.idUsuario === Number(idUsuario) && i.idClase === Number(idClase)
    );

    if (yaInscrito) {
      return { success: false, message: 'Este cliente ya está inscrito en esta clase.' };
    }

    const nuevoId = this.inscripciones.length > 0
      ? Math.max(...this.inscripciones.map(i => i.idInscripcion || 0)) + 1
      : 1;

    const nueva: InscripcionMock = {
      idInscripcion: nuevoId,
      idClase: Number(idClase),
      idUsuario: Number(idUsuario),
      estado: 'confirmado',
      fecha: new Date().toISOString().split('T')[0]
    };

    this.inscripciones.push(nueva);
    this.guardarEnStorage('inscripciones', this.inscripciones);
    return { success: true, message: 'Inscripción realizada con éxito' };
  }
}
