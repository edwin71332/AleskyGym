// Datos iniciales de prueba (mocks) basados en el volcado de la base de datos MySQL
import { Categoria } from '../interfaces/categoria';
import { Especialidad } from '../interfaces/especialidad';
import { Sala } from '../interfaces/sala';
import { Instructor } from '../interfaces/instructor';
import { Cliente } from '../interfaces/cliente';

// Modelo interno para usuarios registrados
export interface UsuarioMock extends Cliente {
  id_usuario: number;
}

// Modelo interno para clases almacenadas
export interface ClaseMock {
  id_clase: number;
  nombre: string;
  descripcion: string;
  fecha_inicio?: string;
  fecha_final?: string;
  hora_inicio?: string;
  hora_final?: string;
  duracion?: number;
  capacidad: number;
  estado: string;
  id_instructor: number;
  id_categoria: number;
  id_sala: number;
}

// Modelo interno para inscripciones
export interface InscripcionMock {
  idInscripcion: number;
  idClase: number;
  idUsuario: number;
  estado: string;
  fecha: string;
}

// Categorías iniciales
export const CATEGORIAS_MOCK: Categoria[] = [
  { id_categoria: 1, nombre: 'Fitness', color: '#FF5733' },
  { id_categoria: 2, nombre: 'Yoga', color: '#6133ff' },
  { id_categoria: 3, nombre: 'Pilates', color: '#3357FF' },
  { id_categoria: 4, nombre: 'Crossfit', color: '#FF33A1' },
  { id_categoria: 5, nombre: 'Cardio', color: '#323232' }
];

// Especialidades iniciales
export const ESPECIALIDADES_MOCK: Especialidad[] = [
  { id_especialidad: 15, nombre: 'Entrenamiento Personal' },
  { id_especialidad: 16, nombre: 'Yoga' },
  { id_especialidad: 17, nombre: 'Pilates' },
  { id_especialidad: 18, nombre: 'Crossfit' },
  { id_especialidad: 19, nombre: 'Zumba' },
  { id_especialidad: 20, nombre: 'Natación' },
  { id_especialidad: 21, nombre: 'Boxeo' },
  { id_especialidad: 22, nombre: 'Cardio' },
  { id_especialidad: 23, nombre: 'Musculación' },
  { id_especialidad: 24, nombre: 'Danza' }
];

// Salas iniciales
export const SALAS_MOCK: Sala[] = [
  { id_sala: 14, nombre: 'Sala A', descripcion: 'Sala para entrenamiento funcional', capacidad: 20, estado: 'Disponible', id_categoria: 1 },
  { id_sala: 15, nombre: 'Sala B', descripcion: 'Sala para yoga y pilates', capacidad: 15, estado: 'Disponible', id_categoria: 2 },
  { id_sala: 16, nombre: 'Sala C', descripcion: 'Sala para clases de crossfit', capacidad: 25, estado: 'Disponible', id_categoria: 3 },
  { id_sala: 17, nombre: 'Sala D', descripcion: 'Sala para clases de zumba y cardio', capacidad: 30, estado: 'Disponible', id_categoria: 4 },
  { id_sala: 18, nombre: 'Sala E', descripcion: 'Sala para natación y rehabilitación', capacidad: 10, estado: 'Disponible', id_categoria: 5 }
];

// Instructores iniciales
export const INSTRUCTORES_MOCK: Instructor[] = [
  {
    id_instructor: 86,
    nombre: 'Juan',
    apellido: 'Pérez',
    telefono: '555-1234',
    correo: 'juan.perez@example.com',
    cedula: 12345678,
    instructorEspecialidades: [
      { id_Instruespecial: 14, especialidad: { id_especialidad: 15, nombre: 'Entrenamiento Personal' } },
      { id_Instruespecial: 15, especialidad: { id_especialidad: 16, nombre: 'Yoga' } }
    ],
    especialidades: ['Entrenamiento Personal', 'Yoga'],
    especialidad: 'Entrenamiento Personal, Yoga'
  },
  {
    id_instructor: 87,
    nombre: 'María',
    apellido: 'Gómez',
    telefono: '555-5678',
    correo: 'maria.gomez@example.com',
    cedula: 87654321,
    instructorEspecialidades: [
      { id_Instruespecial: 16, especialidad: { id_especialidad: 17, nombre: 'Pilates' } },
      { id_Instruespecial: 17, especialidad: { id_especialidad: 18, nombre: 'Crossfit' } }
    ],
    especialidades: ['Pilates', 'Crossfit'],
    especialidad: 'Pilates, Crossfit'
  },
  {
    id_instructor: 88,
    nombre: 'Carlos',
    apellido: 'Ramírez',
    telefono: '555-9012',
    correo: 'carlos.ramirez@example.com',
    cedula: 11223344,
    instructorEspecialidades: [
      { id_Instruespecial: 18, especialidad: { id_especialidad: 19, nombre: 'Zumba' } },
      { id_Instruespecial: 19, especialidad: { id_especialidad: 20, nombre: 'Natación' } }
    ],
    especialidades: ['Zumba', 'Natación'],
    especialidad: 'Zumba, Natación'
  },
  {
    id_instructor: 89,
    nombre: 'Luisa',
    apellido: 'Fernández',
    telefono: '555-3456',
    correo: 'luisa.fernandez@example.com',
    cedula: 44332211,
    instructorEspecialidades: [
      { id_Instruespecial: 20, especialidad: { id_especialidad: 21, nombre: 'Boxeo' } },
      { id_Instruespecial: 21, especialidad: { id_especialidad: 22, nombre: 'Cardio' } }
    ],
    especialidades: ['Boxeo', 'Cardio'],
    especialidad: 'Boxeo, Cardio'
  },
  {
    id_instructor: 90,
    nombre: 'Ana',
    apellido: 'López',
    telefono: '555-7890',
    correo: 'ana.lopez@example.com',
    cedula: 55667788,
    instructorEspecialidades: [
      { id_Instruespecial: 22, especialidad: { id_especialidad: 23, nombre: 'Musculación' } },
      { id_Instruespecial: 23, especialidad: { id_especialidad: 24, nombre: 'Danza' } }
    ],
    especialidades: ['Musculación', 'Danza'],
    especialidad: 'Musculación, Danza'
  }
];

// Clientes y usuarios de prueba
export const CLIENTES_MOCK: UsuarioMock[] = [
  { id_usuario: 14, nombre: 'Carlos', apellido: 'Gómez', correo: 'carlos.gomez@email.com', cedula: '12345678', telefono: '555-1234' },
  { id_usuario: 15, nombre: 'María', apellido: 'López', correo: 'maria.lopez@email.com', cedula: '23456789', telefono: '555-2345' },
  { id_usuario: 16, nombre: 'Juan', apellido: 'Pérez', correo: 'juan.perez@email.com', cedula: '34567890', telefono: '555-3456' },
  { id_usuario: 17, nombre: 'Ana', apellido: 'Martínez', correo: 'ana.martinez@email.com', cedula: '45678901', telefono: '555-4567' },
  { id_usuario: 18, nombre: 'Luis', apellido: 'Rodríguez', correo: 'luis.rodriguez@email.com', cedula: '56789012', telefono: '555-5678' },
  { id_usuario: 19, nombre: 'Sofía', apellido: 'Díaz', correo: 'sofia.diaz@email.com', cedula: '67890123', telefono: '555-6789' },
  { id_usuario: 20, nombre: 'Miguel', apellido: 'Fernández', correo: 'miguel.fernandez@email.com', cedula: '78901234', telefono: '555-7890' },
  { id_usuario: 21, nombre: 'Laura', apellido: 'García', correo: 'laura.garcia@email.com', cedula: '89012345', telefono: '555-8901' },
  { id_usuario: 22, nombre: 'Diego', apellido: 'Sánchez', correo: 'diego.sanchez@email.com', cedula: '90123456', telefono: '555-9012' },
  { id_usuario: 23, nombre: 'Lucía', apellido: 'Torres', correo: 'lucia.torres@email.com', cedula: '01234567', telefono: '555-0123' },
  { id_usuario: 24, nombre: 'Andrés', apellido: 'Ramírez', correo: 'andres.ramirez@email.com', cedula: '11223344', telefono: '555-1122' },
  { id_usuario: 25, nombre: 'Paula', apellido: 'Vargas', correo: 'paula.vargas@email.com', cedula: '22334455', telefono: '555-2233' }
];

// Clases iniciales
export const CLASES_MOCK: ClaseMock[] = [
  {
    id_clase: 27,
    nombre: 'Yoga Matutino',
    descripcion: 'Clase de yoga para principiantes con posturas suaves y respiración consciente',
    fecha_inicio: '2026-11-01',
    fecha_final: '2026-11-30',
    hora_inicio: '06:30:00',
    hora_final: '07:30:00',
    duracion: 60,
    capacidad: 15,
    estado: 'Disponible',
    id_instructor: 86,
    id_categoria: 2,
    id_sala: 15
  },
  {
    id_clase: 28,
    nombre: 'Pilates Intermedio',
    descripcion: 'Ejercicios de pilates para nivel intermedio fortaleciendo el core',
    fecha_inicio: '2026-11-02',
    fecha_final: '2026-11-30',
    hora_inicio: '08:00:00',
    hora_final: '09:00:00',
    duracion: 60,
    capacidad: 20,
    estado: 'Disponible',
    id_instructor: 87,
    id_categoria: 3,
    id_sala: 15
  },
  {
    id_clase: 29,
    nombre: 'Zumba Fitness',
    descripcion: 'Clase de zumba dinámica para quemar calorías con ritmos latinos',
    fecha_inicio: '2026-11-01',
    fecha_final: '2026-11-30',
    hora_inicio: '18:00:00',
    hora_final: '19:00:00',
    duracion: 60,
    capacidad: 25,
    estado: 'Disponible',
    id_instructor: 88,
    id_categoria: 1,
    id_sala: 14
  },
  {
    id_clase: 30,
    nombre: 'Spinning Intensivo',
    descripcion: 'Sesión intensa de ciclismo indoor y resistencia cardiovascular',
    fecha_inicio: '2026-11-03',
    fecha_final: '2026-11-30',
    hora_inicio: '07:15:00',
    hora_final: '08:00:00',
    duracion: 45,
    capacidad: 18,
    estado: 'Disponible',
    id_instructor: 89,
    id_categoria: 5,
    id_sala: 17
  },
  {
    id_clase: 31,
    nombre: 'Entrenamiento Funcional',
    descripcion: 'Circuitos funcionales de fuerza, agilidad y resistencia',
    fecha_inicio: '2026-11-04',
    fecha_final: '2026-11-30',
    hora_inicio: '08:30:00',
    hora_final: '09:00:00',
    duracion: 30,
    capacidad: 12,
    estado: 'Disponible',
    id_instructor: 90,
    id_categoria: 1,
    id_sala: 14
  },
  {
    id_clase: 32,
    nombre: 'Crossfit WOD',
    descripcion: 'Entrenamiento de alta intensidad con levantamientos y gimnasia',
    fecha_inicio: '2026-11-05',
    fecha_final: '2026-11-30',
    hora_inicio: '19:00:00',
    hora_final: '20:00:00',
    duracion: 60,
    capacidad: 20,
    estado: 'Disponible',
    id_instructor: 87,
    id_categoria: 4,
    id_sala: 16
  }
];

// Inscripciones iniciales
export const INSCRIPCIONES_MOCK: InscripcionMock[] = [
  { idInscripcion: 50, idClase: 27, idUsuario: 14, estado: 'confirmado', fecha: '2026-11-01' },
  { idInscripcion: 51, idClase: 28, idUsuario: 15, estado: 'confirmado', fecha: '2026-11-02' },
  { idInscripcion: 52, idClase: 29, idUsuario: 16, estado: 'confirmado', fecha: '2026-11-03' },
  { idInscripcion: 53, idClase: 30, idUsuario: 17, estado: 'confirmado', fecha: '2026-11-04' },
  { idInscripcion: 54, idClase: 31, idUsuario: 18, estado: 'confirmado', fecha: '2026-11-05' },
  { idInscripcion: 55, idClase: 32, idUsuario: 19, estado: 'confirmado', fecha: '2026-11-06' }
];
