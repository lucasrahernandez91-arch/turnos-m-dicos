import { Request, Response, NextFunction } from 'express';
import * as doctorService from '../services/doctorService.js';
import { createDoctorSchema } from '../schemas/doctorSchema.js';

export const getDoctors = async (
  req: Request, 
  res: Response, 
  next: NextFunction
) => {
  try {
    const { especialidad, activo } = req.query;

    const doctors = await doctorService.getAllDoctors({
      especialidad: especialidad as string,
      activo: activo !== undefined ? activo === 'true' : undefined,
    });
    res.status(200).json(doctors);

  } catch (error) {
    next(error);
  }
};

export const getDoctorById = async (
  req: Request, 
  res: Response, 
  next: NextFunction
) => {
  try {
    const doctor = await doctorService.getDoctorById(
      Number(req.params.id));
    res.status(200).json(doctor);
  } catch (error) {
    next(error);
  }
};

export const createDoctor = async (
  req: Request, 
  res: Response, 
  next: NextFunction
) => {
  try {
   const data = createDoctorSchema.parse(req.body);

   const newDoctor = await doctorService.createDoctor(data); 
    console.clear();

    const doctors = await doctorService.getAllDoctors({});
    console.table(doctors);

    res.status(201).json(newDoctor);
  } catch (error) {
    next(error);
  }
};

export const updateDoctor = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {

    try {

        const updatedDoctor = await doctorService.updateDoctor(
            Number(req.params.id),
            req.body
        );

        console.clear();

        const doctors = await doctorService.getAllDoctors({});

        console.table(doctors);

        res.status(200).json(updatedDoctor);

    } catch (error) {

        next(error);

    }
};
export const deleteDoctor = async (
  req: Request, 
  res: Response, 
  next: NextFunction) => {
  try {
    await doctorService.deleteDoctor(Number(req.params.id));

    console.clear();

    const doctors = await doctorService.getAllDoctors({});
    console.table(doctors);
    
    res.status(204).send();
  } catch (error) {
    next(error);
  }
};