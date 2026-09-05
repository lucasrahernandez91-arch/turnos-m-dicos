import {configuracionAgenda} from './resources.js';
import {arrayProfesionales, arrayEspecialidades} from './resources.js';

console.clear();
console.log('CONFIGURACION DE LA AGENDA:');
console.table(configuracionAgenda);
console.log('PROFESIONES:');
console.table(arrayProfesionales);
console.log('ESPECIALIDADES:');
console.table(arrayEspecialidades);