Turnos Médicos

API REST para la gestión de profesionales, especialidades y turnos médicos.

Proyecto desarrollado como parte de la materia Integraciones Web, utilizando Node.js, TypeScript y Express, con persistencia de datos mediante archivos JSON.

------------------------------------------------------------------------------------

Tecnologías Utilizadas
Lenguaje: TypeScript

Entorno de Ejecución: Node.js (ES Modules)

Framework: Express.js

Validación: Zod

Persistencia: Archivos JSON.
Pruebas de API: Postman
Control de versiones; Git/ GitHub 

------------------------------------------------------------------------------------

REQUISITOS E INSTALACION
Pre-requisitos
Antes de ejecutar el proyecto es necesario tener instalado:
* Node.js (v18 o superior)
* npm
* Git (opcional, para clonar el repositorio)
------------------------------------------------------------------------------------
Instalación
Clonar el repositorio:
git clone https://github.com/lucasrahernandez91-arch/turnos-m-dicos.git

Ingresar a la carpeta del proyecto:

cd turnos-medicos

Instalar las dependencias:

npm install

------------------------------------------------------------------------------------

EJECUCIÓN DEL PROYECTO

Para compilar el código TypeScript:

npm run compilar

Para iniciar el servidor:

npm start

Una vez iniciado correctamente, el servidor queda disponible en:

http://localhost:3000

------------------------------------------------------------------------------------

ESTRUCTURA DEL PROYECTO
turnos-medicos/
|__postman/
|  |-Turnos_medicos_API.postman_collection.json
|  |-Turnos-API-Local.postman_environment.json
|
|__src/
|  |_data/ 
|  |  |_profesionales.json
|  |  |_especialidades.json
|  |  |_turnos.json
|  |
|  |_controllers/
|  |  |_doctorController.ts
|  |  |_appointmentController.ts
|  |  |_specialtyRoutes.ts
|  |
|  |_routes/
|  |  |_doctorRoutes.ts
|  |  |_appointmentRoutes.ts
|  |  |_specialtyRoutes.ts
|  |
|  |_schemas/
|  |  |...
|  | 
|  |_services/
|  |  |...
|  |
|  | 
|  |_middlewares/ 
|  |  |_notFound.ts
|  |  |_errorHandler.ts
|  |
|  |_index.ts
| 
|__dist/
|__.gitignore
|__package.json
|__package-lock.json
|__README.md
|__tsconfig.json

------------------------------------------------------------------------------------

PERSISTENCIA DE DATOS

Los datos de la aplicación se almacenan localmente mediante archivos JSON ubicados en:

src/data/

Los principales archivos son:

* profesionales.json: contiene los profesionales médicos.
* especialidades.json: contiene las especialidades médicas.
* turnos.json: contiene los turnos registrados.

La lectura y escritura de los archivos se realiza utilizando el módulo:

node:fs/promises

------------------------------------------------------------------------------------

PROFESIONALES

La API permite realizar operaciones CRUD sobre los profesionales médicos.

La ruta principal es:

/profesionales

------------------------------------------------------------------------------------
OBTENER TODOS LOS PROFESIONALES

GET /profesionales

Devuelve la lista completa de profesionales registrados.

También permite realizar consultas mediante parámetros, según la implementación del controlador.

------------------------------------------------------------------------------------

OBTENER UN PROFESIONAL POR ID

GET /profesionales/:id

Ejemplo:

GET /profesionales/1

Si el profesional no existe, se devuelve un error 404.

Ejemplo:

{
  "status": 404,
  "message": "No se encontró el médico con ID 999",
  "code": "DOCTOR_NOT_FOUND",
  "details": []
}

------------------------------------------------------------------------------------

CREAR UN PROFESIONAL

POST /profesionales

Ejemplo de cuerpo JSON:

{
  "medicoId": 32,
  "nombre": "Lucas Hernández",
  "especialidad": "Clínica Médica",
  "activo": true
}

El cuerpo de la solicitud es validado antes de crear el profesional.

------------------------------------------------------------------------------------

ACTUALIZAR UN PROFESIONAL

PUT /profesionales/:id

Ejemplo:

PUT /profesionales/32

Permite modificar los datos de un profesional existente.

------------------------------------------------------------------------------------

ELIMINAR UN PROFESIONAL

DELETE /profesionales/:id

Ejemplo:

DELETE /profesionales/32

La eliminación implementada es una baja lógica.

En lugar de eliminar físicamente el registro del archivo JSON, el profesional pasa a tener:

"activo": false

La API responde:

204 No Content

------------------------------------------------------------------------------------

ESPECIALIDADES

La ruta principal es:

/especialidades

------------------------------------------------------------------------------------

OBTENER TODAS LAS ESPECIALIDADES

GET /especialidades

Devuelve las especialidades médicas disponibles.

------------------------------------------------------------------------------------

OBTENER TODAS LAS ESPECIALIDADES POR ID

GET /especialidades/:id

Ejemplo:

GET /especialidades/1

Si la especialidad existe, devuelve sus datos.

------------------------------------------------------------------------------------

TURNOS MEDICOS

La ruta principal para los turnos es:

/turnos

Los turnos se almacenan en:

src/data/turnos.json

------------------------------------------------------------------------------------

OBTENER TODOS LOS TURNOS

GET /turnos

Devuelve todos los turnos registrados.

------------------------------------------------------------------------------------

OBTENER UN TURNO POR ID

GET /turnos/:id

Ejemplo:

GET /turnos/1

Si el turno no existe, la API devuelve un error 404.

------------------------------------------------------------------------------------

CREAR UN TURNO

POST /turnos

Permite registrar un nuevo turno médico.

Los datos enviados son validados utilizando Zod antes de realizar la operación.

La fecha del turno utiliza el formato establecido por el proyecto:

DD/MM/YYYY

------------------------------------------------------------------------------------

ACTUALIZAR UN TURNO

PUT /turnos/:id

Ejemplo:

PUT /turnos/1

Permite modificar un turno existente.

------------------------------------------------------------------------------------

ELIMINAR UN TURNO

DELETE /turnos/:id

Ejemplo:

DELETE /turnos/1

Cuando la operación se realiza correctamente, la API responde:

204 No Content

------------------------------------------------------------------------------------

PARÁMETROS DE CONSULTA

Los endpoints pueden utilizar parámetros de consulta para filtrar información.

Ejemplo:

GET /turnos?especialidad=Clinica%20Medica&fecha=15/09/2026

Los parámetros permiten realizar búsquedas específicas según los criterios implementados en la API.

------------------------------------------------------------------------------------

CONFIGURACIÓN DE LA AGENDA

La agenda médica utiliza la siguiente configuración:

Configuración	Valor
---------------------------------
Fecha máxima	2026-12-30
---------------------------------
Hora mínima	07:00
---------------------------------
Hora máxima	13:00
----------------------------------
Duración de turno	30 minutos
----------------------------------
Días de atención	Lunes a viernes
----------------------------------

------------------------------------------------------------------------------------

MANEJO CENTRALIZADO DE ERRORES

El proyecto cuenta con middlewares para centralizar el manejo de errores.

400 — Error de validación

Se utiliza cuando los datos enviados no cumplen con las reglas establecidas por los esquemas de Zod.

Ejemplo:

{
  "status": 400,
  "message": "Error de validación en los datos ingresados",
  "code": "VALIDATION_ERROR",
  "details": []
}

------------------------------------------------------------------------------------
404 — Recurso no encontrado

Se utiliza cuando se intenta acceder a un recurso que no existe.

Ejemplo:

{
  "status": 404,
  "message": "No se encontró el médico con ID 999",
  "code": "DOCTOR_NOT_FOUND",
  "details": []
}

Para turnos se utiliza el código:

APPOINTMENT_NOT_FOUND

------------------------------------------------------------------------------------

500 — ERROR INTERNO

Se utiliza para excepciones o errores no controlados dentro del servidor.

Código:

INTERNAL_SERVER_ERROR

------------------------------------------------------------------------------------

PRUEBAS CON POSTMAN

El proyecto incluye una colección de Postman para probar los endpoints.

Archivos:

postman/
├── Turnos_medicos_API.postman_collection.json
└── Turnos-API-Local.postman_environment.json

La URL base utilizada en Postman es:

http://localhost:3000

Variable:

baseUrl

Ejemplo:

{{baseUrl}}/profesionales

------------------------------------------------------------------------------------

PRUEBAS REALIZADAS

Durante el desarrollo se verificaron las principales operaciones de la API.

Profesionales

* GET /profesionales
* GET /profesionales/:id
* POST /profesionales
* PUT /profesionales/:id
* DELETE /profesionales/:id

También se verificaron:

* Profesional existente.
* Profesional inexistente.
* Creación de profesional.
* Validación de datos.
* Actualización de profesional.
* Baja lógica de profesional.
* Respuesta 204 No Content.

Especialidades
* GET /especialidades
* GET /especialidades/:id

Manejo de errores

Se verificaron respuestas:

* 400 VALIDATION_ERROR
* 404 DOCTOR_NOT_FOUND
* 404 APPOINTMENT_NOT_FOUND
* 500 INTERNAL_SERVER_ERROR

------------------------------------------------------------------------------------
USO DE INTELIGENCIA INTERNACIONAL

Durante el desarrollo del proyecto se utilizó Inteligencia Artificial como herramienta de asistencia para comprender, generar y revisar código.

Las herramientas de IA fueron utilizadas como apoyo y posteriormente se realizaron modificaciones y ajustes manuales al código generado.

------------------------------------------------------------------------------------

ESQUEMAS DE VALIDACION DE ZOD

Se utilizó IA para obtener una propuesta inicial de un esquema de validación para los turnos médicos.

Posteriormente se realizaron ajustes manuales, principalmente relacionados con:

* Formato de fechas.
* Validación de strings.
* Sanitización de datos.
* Reglas específicas del proyecto.

------------------------------------------------------------------------------------

MANEJO CENTRALIZADO DE ERRORES

Se utilizó IA como apoyo para desarrollar un middleware global de errores.

El código fue posteriormente adaptado para utilizar una estructura uniforme de respuestas:

{
  "status": 400,
  "message": "...",
  "code": "VALIDATION_ERROR",
  "details": []
}

------------------------------------------------------------------------------------

SCRIPTS DE POSTMAN

Se utilizó IA para generar una propuesta de script para guardar automáticamente el ID generado al crear un recurso.

El script fue adaptado para utilizar variables de entorno de Postman, por ejemplo:

pm.environment.set("appointmentId", jsonData.id);

------------------------------------------------------------------------------------
ESTADO ACTUAL DEL PROYECTO

Actualmente la API cuenta con:

* Servidor Express configurado.
* TypeScript configurado.
* Rutas separadas mediante Router.
* Controladores separados.
* Middlewares de errores.
* Validación mediante Zod.
* Persistencia mediante archivos JSON.
* CRUD de profesionales.
* Consulta de especialidades.
* Gestión de turnos.
* Pruebas mediante Postman.
* Manejo centralizado de errores.
* Repositorio GitHub.

------------------------------------------------------------------------------------
AUTOR

Lucas Hernández

Proyecto académico — Integraciones Web.