import { Request, Response, NextFunction } from 'express';

import * as specialtyService from '../services/specialtyService.js';

export const getSpecialties = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const specialties = await specialtyService.getAllSpecialties();

    res.status(200).json(specialties);
  } catch (error) {
    next(error);
  }
};

export const getSpecialtyById = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const specialty = await specialtyService.getSpecialtyById(
      Number(req.params.id)
    );

    res.status(200).json(specialty);
  } catch (error) {
    next(error);
  }
};

export const createSpecialty = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const newSpecialty = await specialtyService.createSpecialty(
      req.body
    );

    console.clear();

    const specialties =
      await specialtyService.getAllSpecialties();

    console.table(specialties);

    res.status(201).json(newSpecialty);
  } catch (error) {
    next(error);
  }
};

export const deleteSpecialty = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    await specialtyService.deleteSpecialty(
      Number(req.params.id)
    );

    console.clear();

    const specialties =
      await specialtyService.getAllSpecialties();

    console.table(specialties);

    res.status(204).send();
  } catch (error) {
    next(error);
  }
};