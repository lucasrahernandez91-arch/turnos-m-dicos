Pacientes y Turnos

## 1. Entidad Paciente

La entidad **Paciente** representa a la persona que solicita y utiliza los servicios de atención médica dentro del sistema TurnosMed.

Para registrar un paciente se consideran como datos mínimos e indispensables:

- Identificador único del paciente.
- DNI.
- Nombre.
- Apellido.
- Fecha de nacimiento.
- Teléfono.
- Correo electrónico.
- Estado del paciente.

### Modelo de datos

```typescript
interface Paciente {
    pacienteId: number;
    dni: string;
    nombre: string;
    apellido: string;
    fechaNacimiento: string;
    telefono: string;
    email: string;
    activo: boolean;
}

