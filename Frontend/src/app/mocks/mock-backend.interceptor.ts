// Interceptor HTTP de Angular que intercepta llamadas dirigidas al backend y responde con datos simulados
import { HttpErrorResponse, HttpEvent, HttpHandlerFn, HttpInterceptorFn, HttpRequest, HttpResponse } from '@angular/common/http';
import { inject } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { delay } from 'rxjs/operators';
import { MockStorageService } from './mock-storage.service';

export const mockBackendInterceptor: HttpInterceptorFn = (
  req: HttpRequest<unknown>,
  next: HttpHandlerFn
): Observable<HttpEvent<unknown>> => {
  const storage = inject(MockStorageService);

  // Verificar si la petición está dirigida a la API del gimnasio
  const esUrlApi = req.url.includes('/gimnasio-app') || req.url.includes('localhost:8080');

  if (!esUrlApi) {
    return next(req);
  }

  // Parsear la URL para extraer ruta limpia y parámetros de consulta
  let urlObj: URL;
  try {
    urlObj = new URL(req.url, 'http://localhost:8080');
  } catch {
    // Si la URL no puede parsearse directamente, se procesa de forma relativa
    urlObj = new URL('http://localhost:8080' + (req.url.startsWith('/') ? req.url : '/' + req.url));
  }

  const path = urlObj.pathname.replace(/\/+/g, '/');
  const method = req.method.toUpperCase();
  const page = parseInt(urlObj.searchParams.get('page') || '0', 10);
  const size = parseInt(urlObj.searchParams.get('size') || '10', 10);

  // Retardo simulado en milisegundos para emular latencia de red realista
  const latenciaMs = 120;

  const responderOk = <T>(cuerpo: T): Observable<HttpEvent<T>> => {
    return of(new HttpResponse({ status: 200, body: cuerpo })).pipe(delay(latenciaMs));
  };

  const responderCreado = <T>(cuerpo: T): Observable<HttpEvent<T>> => {
    return of(new HttpResponse({ status: 201, body: cuerpo })).pipe(delay(latenciaMs));
  };

  const responderError = (status: number, mensaje: string): Observable<never> => {
    return throwError(() => new HttpErrorResponse({
      status,
      statusText: status === 400 ? 'Bad Request' : 'Error',
      error: { message: mensaje }
    })).pipe(delay(latenciaMs));
  };

  // --- CATEGORÍAS ---
  if (path.includes('/gimnasio-app/categorias/Paginados') && method === 'GET') {
    return responderOk(storage.getCategoriasPaginadas(page, size));
  }

  if (path.endsWith('/gimnasio-app/categorias') || path.endsWith('/gimnasio-app/categorias/')) {
    if (method === 'GET') {
      return responderOk(storage.getCategorias());
    }
    if (method === 'POST') {
      return responderCreado(storage.addCategoria(req.body as any));
    }
  }

  // --- ESPECIALIDADES ---
  if (path.includes('/gimnasio-app/especialidades/Paginados') && method === 'GET') {
    return responderOk(storage.getEspecialidadesPaginadas(page, size));
  }

  if (path.endsWith('/gimnasio-app/especialidades') || path.endsWith('/gimnasio-app/especialidades/')) {
    if (method === 'GET') {
      return responderOk(storage.getEspecialidades());
    }
    if (method === 'POST') {
      return responderCreado(storage.addEspecialidad(req.body as any));
    }
  }

  // --- SALAS ---
  if (path.includes('/gimnasio-app/salas')) {
    if (method === 'GET') {
      return responderOk(storage.getSalas());
    }
    if (method === 'POST') {
      return responderCreado(storage.addSala(req.body as any));
    }
  }

  // --- INSTRUCTORES ---
  if (path.includes('/gimnasio-app/instructores/simple') && method === 'GET') {
    return responderOk(storage.getInstructoresBasic());
  }

  if (path.includes('/gimnasio-app/instructores/Nuevo') && method === 'GET') {
    return responderOk(storage.getInstructoresPaginados(page, size));
  }

  if (path.includes('/gimnasio-app/instructores/registrar') && method === 'POST') {
    return responderCreado(storage.addInstructor(req.body));
  }

  // Subida de archivos / licencias de instructor
  if (path.match(/\/gimnasio-app\/instructores\/\d+\/licencias/) && method === 'POST') {
    const coincidencia = path.match(/\/gimnasio-app\/instructores\/(\d+)\/licencias/);
    const idInstructor = coincidencia ? parseInt(coincidencia[1], 10) : 1;
    return responderCreado({
      id: Math.floor(Math.random() * 1000) + 1,
      instructorId: idInstructor,
      filename: 'licencia_demo.pdf',
      filepath: 'uploads/licencia_demo.pdf',
      uploadedAt: new Date().toISOString()
    });
  }

  // Actualización de instructor (PUT /instructores/{id})
  if (path.match(/\/gimnasio-app\/instructores\/\d+$/) && method === 'PUT') {
    const coincidencia = path.match(/\/gimnasio-app\/instructores\/(\d+)$/);
    const idInstructor = coincidencia ? parseInt(coincidencia[1], 10) : 1;
    return responderOk(storage.updateInstructor(idInstructor, req.body));
  }

  if (path.endsWith('/gimnasio-app/instructores') || path.endsWith('/gimnasio-app/instructores/')) {
    if (method === 'GET') {
      return responderOk(storage.getInstructores());
    }
  }

  // --- CLIENTES / USUARIOS ---
  if (path.includes('/gimnasio-app/usuarios/Modal') && method === 'GET') {
    return responderOk(storage.getClientesModal());
  }

  if (path.includes('/gimnasio-app/usuarios/Registrar') && method === 'POST') {
    return responderCreado(storage.addCliente(req.body as any));
  }

  if (path.includes('/gimnasio-app/usuarios')) {
    if (method === 'GET') {
      return responderOk(storage.getClientesPaginados(page, size));
    }
  }

  // --- CLASES ---
  if (path.includes('/gimnasio-app/clases/disponibles') && method === 'GET') {
    return responderOk(storage.getClasesDisponibles());
  }

  if (path.includes('/gimnasio-app/clases/crear') && method === 'POST') {
    return responderCreado(storage.addClase(req.body));
  }

  if (path.includes('/gimnasio-app/clases/asignar-horario') && method === 'POST') {
    return responderOk(storage.asignarHorario(req.body as any));
  }

  if (path.endsWith('/gimnasio-app/clases') || path.endsWith('/gimnasio-app/clases/')) {
    if (method === 'GET') {
      return responderOk(storage.getClasesPaginadas(page, size));
    }
  }

  // --- INSCRIPCIONES ---
  if (path.includes('/gimnasio-app/inscripcion/ids') && method === 'GET') {
    return responderOk(storage.getInscripcionesIds());
  }

  if (path.includes('/gimnasio-app/inscripcion') && method === 'POST') {
    const payload = req.body as { id_usuario: number; id_clase: number };
    const resultado = storage.inscribirCliente(payload.id_usuario, payload.id_clase);
    if (!resultado.success) {
      return responderError(400, resultado.message);
    }
    return responderOk({ message: resultado.message });
  }

  // Respuesta por defecto ante rutas imprevistas para evitar bloqueos
  console.warn(`[MockInterceptor] Ruta no mapeada explícitamente: ${method} ${path}`);
  return responderOk({});
};
