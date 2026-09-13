import express from 'express';
import doctorRoutes from './routes/doctorRoutes.js';
import appointmentRoutes from './routes/appointmentRoutes.js';
import specialtyRoutes from './routes/specialtyRoutes.js';
import { notFound } from './middlewares/notFound.js';
import { errorHandler } from './middlewares/errorHandler.js';

const app = express();

app.use(express.json());

// Endpoint base para Médicos
app.use('/profesionales', doctorRoutes);
app.use('/turnos', appointmentRoutes);
app.use('/especialidades', specialtyRoutes)
app.use(notFound);

// Middleware global de errores (SIEMPRE al final de todas las rutas)
app.use(errorHandler);

console.log("LLEGUE AL APP.LISTEN");

app.listen(3000, () => {
  console.log(`Servidor escuchando en http://localhost:3000`);
});
