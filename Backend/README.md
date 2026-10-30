# Backend - AleskyGym

API RESTful desarrollada en **Java 21** con **Spring Boot 3.4** encargada de la lógica de negocio, persistencia relacional y gestión de reservas del gimnasio AleskyGym.

---

## 🛠️ Tecnologías y Dependencias

- **Lenguaje**: Java 21
- **Framework Principal**: Spring Boot 3.4.2
- **Capa de Persistencia**: Spring Data JPA con Hibernate
- **Motor de Base de Datos**: MySQL 8.x
- **Validaciones**: Spring Boot Starter Validation (Hibernate Validator)
- **Documentación OpenAPI**: Springdoc OpenAPI v3 (Swagger UI integrado)
- **Herramientas**: Lombok y Google Guava
- **Gestión de Compilación**: Maven con Maven Wrapper

---

## 🏛️ Organización de Paquetes

Arquitectura orientada a dominios dividida en capas (`Controlador` -> `Servicio` -> `Repositorio` -> `Entidad/DTO`):

```plaintext
Backend/src/main/java/gn/gimnasio/
├── categoria/             # Categorías de disciplinas deportivas
├── clase/                 # Gestión de clases, horarios y cupos
├── especialidad/          # Catálogo de especialidades técnicas
├── instructor/            # Administración de instructores
├── lincenciaInstructor/   # Gestión de certificaciones y licencias
├── sala/                  # Control de salas y capacidades
├── usuario/               # Administración de clientes
└── inscripcion/           # Gestión de reservas y concurrencia de cupos
```

---

## 🗄️ Configuración de la Base de Datos

El repositorio incluye el volcado `gimnasio.sql` con el esquema de tablas y datos de prueba.

### Restauración en MySQL:

* **En Windows (PowerShell):**
  ```powershell
  mysql -u root -e "CREATE DATABASE IF NOT EXISTS gimnasio;"
  Get-Content gimnasio.sql | mysql -u root gimnasio
  ```
  *(Si utilizas XAMPP y `mysql` no se encuentra en el PATH, antepón la ruta: `& "C:\xampp\mysql\bin\mysql.exe"`)*.

* **En Windows (CMD tradicional):**
  ```cmd
  mysql -u root -e "CREATE DATABASE IF NOT EXISTS gimnasio;"
  mysql -u root gimnasio < gimnasio.sql
  ```

* **En Linux / macOS (Bash / Zsh):**
  ```bash
  mysql -u root -e "CREATE DATABASE IF NOT EXISTS gimnasio;"
  mysql -u root gimnasio < gimnasio.sql
  ```

### Parámetros de conexión (`src/main/resources/application.properties`):
```properties
spring.datasource.url=jdbc:mysql://localhost:3306/gimnasio?useSSL=false&serverTimezone=UTC&allowPublicKeyRetrieval=true
spring.datasource.username=root
spring.datasource.password=
```

---

## 🚀 Ejecución del Servicio

* **En Windows (PowerShell / CMD):**
  ```powershell
  cd Backend
  .\mvnw.cmd spring-boot:run
  ```

* **En Linux / macOS:**
  ```bash
  cd Backend
  ./mvnw spring-boot:run
  ```

El servicio se iniciará en el puerto `8080` bajo el contexto `/gimnasio-app`.

---

## 📖 Documentación OpenAPI / Swagger

Con el servicio en ejecución, la documentación técnica y las pruebas interactivas están disponibles en:

- **Swagger UI**: [http://localhost:8080/swagger-ui.html](http://localhost:8080/swagger-ui.html)
- **Especificación OpenAPI (JSON)**: [http://localhost:8080/v3/api-docs](http://localhost:8080/v3/api-docs)

---

## 📡 Endpoints Principales

| Dominio | Método | Ruta | Descripción |
| :--- | :--- | :--- | :--- |
| **Clases** | `GET` | `/gimnasio-app/clases` | Catálogo de clases con soporte de paginación |
| | `GET` | `/gimnasio-app/clases/disponibles` | Clases activas con disponibilidad de plazas |
| | `POST` | `/gimnasio-app/clases/crear` | Registro de una nueva clase |
| | `POST` | `/gimnasio-app/clases/asignar-horario` | Asignación de rangos de fechas, horarios y duración |
| **Inscripciones** | `POST` | `/gimnasio-app/inscripcion` | Registro de inscripción de un cliente |
| | `GET` | `/gimnasio-app/inscripcion/ids` | Relación de identificadores de inscripciones activas |
| **Instructores** | `GET` | `/gimnasio-app/instructores` | Listado completo de instructores |
| | `GET` | `/gimnasio-app/instructores/simple` | Listado condensado (nombre y especialidades) |
| | `POST` | `/gimnasio-app/instructores/registrar` | Registro de un nuevo instructor |
| | `POST` | `/gimnasio-app/instructores/{id}/licencias` | Carga de archivos y certificaciones |
| **Salas** | `GET` | `/gimnasio-app/salas` | Listado de salas de entrenamiento |
| | `POST` | `/gimnasio-app/salas` | Creación de nuevas salas |
| **Categorías** | `GET` | `/gimnasio-app/categorias` | Catálogo de categorías deportivas |
| **Clientes** | `GET` | `/gimnasio-app/usuarios` | Listado paginado de clientes registrados |
| | `GET` | `/gimnasio-app/usuarios/Modal` | Listado simplificado para selectores de reserva |
| | `POST` | `/gimnasio-app/usuarios/Registrar` | Alta de clientes en el sistema |
