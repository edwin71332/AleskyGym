# Frontend - AleskyGym

Interfaz de usuario desarrollada en **Angular 19** para la administración integral y reserva de clases deportivas en AleskyGym.

---

## 🛠️ Tecnologías

- **Framework**: Angular 19 (Standalone Components)
- **Estilos**: Tailwind CSS 4
- **Notificaciones**: SweetAlert2
- **Gestión HTTP y Simulación**: Angular `HttpInterceptorFn` con soporte de persistencia local en `localStorage` (en rama `demo`)

---

## 📦 Instalación y Ejecución

### Prerrequisitos
- Node.js 18+
- npm 9+

### Instrucciones:

1. **Acceder al directorio**:
   ```bash
   cd Frontend
   ```

2. **Instalar dependencias**:
   ```bash
   npm install
   ```

3. **Ejecutar en entorno local**:
   ```bash
   npx ng serve
   ```
   La aplicación se servirá en [http://localhost:4200](http://localhost:4200).

4. **Compilación de producción**:
   ```bash
   npm run build
   ```
   Los artefactos optimizados se generan en el directorio `dist/angular/browser`.

---

## 🎭 Módulo de Simulación (Mocks)

La aplicación incorpora un subsistema de mocks ubicado en `src/app/mocks/`:
- **`mock-data.ts`**: Conjunto de datos base estructurado según el esquema de la base de datos relacional.
- **`mock-storage.service.ts`**: Motor de almacenamiento reactivo que emula operaciones CRUD con soporte de persistencia en `localStorage`.
- **`mock-backend.interceptor.ts`**: Interceptor funcional HTTP que captura peticiones hacia `/gimnasio-app/*` y responde con códigos de estado HTTP estándar y tiempos de respuesta simulados.
