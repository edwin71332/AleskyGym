# AleskyGym - Sistema de Gestión de Clases de Gimnasio

Plataforma integral para la administración de un gimnasio que abarca la gestión de clases, asignación de horarios, catálogo de instructores con especialidades, salas de entrenamiento, registro de clientes y módulo interactivo de reservas.

El proyecto está estructurado bajo una arquitectura de **monorepo**, integrando la aplicación cliente en Angular y la API backend en Java Spring Boot con persistencia relacional en MySQL.

---

## 🚀 Demo en Vivo

La aplicación cliente se encuentra desplegada y disponible para pruebas en Vercel:

🔗 **Acceso a la Demo**: [https://gimnasio-app-frontend.vercel.app/](https://gimnasio-app-frontend.vercel.app/)

> **Nota**: La demo opera en modo desacoplado en la rama `demo` mediante un interceptor de mocks en el cliente (`Frontend/src/app/mocks/`), permitiendo explorar la totalidad de los flujos de gestión y reserva con persistencia local en sesión (`localStorage`), sin dependencia de infraestructura backend activa en servidor.

---

## 🏛️ Estructura del Proyecto

```plaintext
AleskyGym/
├── Backend/                 # API RESTful en Java 21 y Spring Boot 3
│   ├── src/                 # Controladores, Entidades JPA, Repositorios, Servicios
│   ├── gimnasio.sql         # Esquema de base de datos y datos iniciales de prueba
│   └── pom.xml              # Configuración y dependencias de Maven
├── Frontend/                # Aplicación Web en Angular 19
│   ├── src/                 # Componentes Standalone, Servicios
│   ├── angular.json         # Configuración del compilador de Angular
│   └── vercel.json          # Configuración de enrutamiento y despliegue
└── README.md                # Documentación principal del repositorio
```

---

## 💻 Stack Tecnológico

### Frontend
- **Framework**: Angular 19 (Arquitectura Standalone Components)
- **Diseño & Estilos**: Tailwind CSS 4
- **Notificaciones**: SweetAlert2
- **Cliente HTTP**: Angular `HttpClient` conectado a la API REST

### Backend
- **Lenguaje**: Java 21
- **Framework**: Spring Boot 3.4.2
- **Capa de Persistencia**: Spring Data JPA & Hibernate
- **Base de Datos**: MySQL 8.x
- **Documentación de API**: SpringDoc OpenAPI 3 / Swagger UI

---

## 🛠️ Instalación y Ejecución Local

### 1. Backend (Java & MySQL)

#### Prerrequisitos:
- Java JDK 21
- MySQL 8.x en ejecución (vía MySQL Server nativo o XAMPP en puerto 3306)
- Maven (o utilizar el wrapper `./mvnw` incluido)

#### Instrucciones:

**Paso 1: Importar la Base de Datos**

Crea una base de datos llamada `gimnasio` e importa el archivo `Backend/gimnasio.sql`. Puedes realizarlo mediante cualquiera de las siguientes opciones:

* **Vía interfaz gráfica (Recomendado en Windows con XAMPP / Workbench)**:
  1. Abre tu gestor visual (ej. [http://localhost/phpmyadmin](http://localhost/phpmyadmin)).
  2. Crea la base de datos `gimnasio`.
  3. En la pestaña **Importar**, selecciona el archivo `Backend/gimnasio.sql` y ejecuta la importación.

* **Vía terminal (Windows PowerShell con XAMPP)**:
  ```powershell
  & "C:\xampp\mysql\bin\mysql.exe" -u root -e "CREATE DATABASE IF NOT EXISTS gimnasio;"
  Get-Content Backend\gimnasio.sql | & "C:\xampp\mysql\bin\mysql.exe" -u root gimnasio
  ```

* **Vía terminal (Linux / macOS / MySQL configurado en PATH)**:
  ```bash
  mysql -u root -e "CREATE DATABASE IF NOT EXISTS gimnasio;"
  mysql -u root gimnasio < Backend/gimnasio.sql
  ```

**Paso 2: Iniciar el servidor Spring Boot**

* **En Windows (PowerShell o CMD):**
  ```powershell
  cd Backend
  .\mvnw.cmd spring-boot:run
  ```

* **En Linux o macOS:**
  ```bash
  cd Backend
  ./mvnw spring-boot:run
  ```

La API quedará operativa en `http://localhost:8080/gimnasio-app` y su documentación interactiva en:
- **Swagger UI**: [http://localhost:8080/swagger-ui.html](http://localhost:8080/swagger-ui.html)
- **OpenAPI JSON**: [http://localhost:8080/v3/api-docs](http://localhost:8080/v3/api-docs)

---

### 2. Frontend (Angular)

#### Prerrequisitos:
- Node.js (v18 o superior)
- npm (v9 o superior)

#### Instrucciones:
1. Acceder al directorio `Frontend`:
   ```bash
   cd Frontend
   ```
2. Instalar los paquetes de dependencias:
   ```bash
   npm install
   ```
3. Iniciar el servidor de desarrollo local:
   ```bash
   npx ng serve
   ```
4. Navegar a [http://localhost:4200](http://localhost:4200) en el navegador web.
