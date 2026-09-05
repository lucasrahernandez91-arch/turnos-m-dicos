import fs from 'node:fs/promises';
import path from 'node:path';

const rutaProfesionales = path.resolve('src', 'data', 'profesionales.json');    
const rutaEspecialidades = path.resolve('src', 'data', 'especialidades.json');

const leerProfesionales = await fs.readFile(rutaProfesionales, 'utf8');
const leerEspecialidades = await fs.readFile(rutaEspecialidades, 'utf8');

export const arrayProfesionales = JSON.parse(leerProfesionales);
export const arrayEspecialidades = JSON.parse(leerEspecialidades);


interface Parametria {
fechaMaxima: string; // Formato ISO  "2026-12-30"
horaMaxima: string; // Formato HH:mm "13:00"
horaMinima: string; // Formato HH:mm "07:00"

}

export const configuracionAgenda: Parametria = {
fechaMaxima: "2026-12-30",
horaMinima: "07:00",
horaMaxima: "13:00"
}

