import express from 'express';
import doctorRoutes from './routes/doctorRoutes.js';
import appointmentRoutes from './routes/appointmentRoutes.js';
import { errorHandler } from './middlewares/errorHandler.js';

const app = express();

app.use(express.json());

// Endpoint base para Médicos
app.use('/medicos', doctorRoutes);
app.use('/turnos', appointmentRoutes);

// Middleware global de errores (SIEMPRE al final de todas las rutas)
app.use(errorHandler);

app.listen(3000, () => {
  console.log(`Servidor escuchando en http://localhost:3000`);
});