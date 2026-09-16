import express from 'express';
import doctorRoutes from './routes/doctorRoutes.js';
import appointmentRoutes from './routes/appointmentRoutes.js';
import specialtyRoutes from './routes/specialtyRoutes.js';
import { routeNotFound, welcome } from './controllers/generalController.js';
import { errorHandler } from './middlewares/errorHandler.js';

const app = express();

app.use(express.json());

app.get('/', welcome);
app.use('/profesionales', doctorRoutes);
app.use('/turnos', appointmentRoutes);
app.use('/especialidades', specialtyRoutes);
app.use(routeNotFound);

// Middleware global de errores (SIEMPRE al final de todas las rutas)
app.use(errorHandler);

app.listen(3000, () => {
  console.log(`Servidor escuchando en http://localhost:3000`);
});
