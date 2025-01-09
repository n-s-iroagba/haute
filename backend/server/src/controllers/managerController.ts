import { Request, Response } from 'express';
import { Manager } from '../types/adminTypes';
import multer from 'multer'
import path from 'path';

import { CreateManagerDto } from '../common/managerType';
import { customError } from '../helpers/commonHelpers';


const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, '../images/'));
  },
  filename: (req, file, cb) => {
    const extension = path.extname(file.originalname);
    cb(null, req.body.firstName + req.body.lastName + extension);
  },
});

export const upload = multer({
  storage: storage,
}).single('image');


export const createManager = async (req: Request, res: Response): Promise<Response> => {
  const {
    lastName,
    firstName,
    minimumInvestmentAmount,
    percentageYield,
    duration,
    qualification,
  } = req.body as CreateManagerDto;

  if (!req.file || !req.file.buffer) {
    console.log('image file', req.file);
    console.log('image file path', req.file?.buffer);
    throw customError('no manager image in payload from client', 400)
  }
  const imagePath = req.file.buffer;

  try {
    const manager = await Manager.create({
      lastName,
      firstName,
      image: imagePath,
      minimumInvestmentAmount,
      percentageYield,
      duration,
      qualification
    });

    return res.status(201).json(manager);
  } catch (error: any) {
    console.error('Error createManager function:', error);
    return res.status(error.status || 500).json(error);
  }
}


export const getAllManagers = async (req: Request, res: Response): Promise<Response> => {
  try {
    const managers = await Manager.findAll();
    return res.status(200).json(managers);
  } catch (error: any) {
    console.error('Error in getAllMangers function:', error);
    return res.status(error.status || 500).json(error);
  }
}


export const getSingleManager = async (req: Request, res: Response): Promise<Response> => {
  const { id } = req.params;
  try {
    const manager = await Manager.findByPk(id);
    if (!manager) {
      throw customError(`manager to be updated with id ${id} not found in database`, 404)
    }
    return res.status(200).json(manager);
  } catch (error: any) {
    console.error('Error in getSingleManger function:', error);
    return res.status(error.status || 500).json(error);
  }
}


export const patchManager = async (req: Request, res: Response): Promise<Response> => {
  const { id } = req.params
  const { lastName, firstName, minimumInvestmentAmount, percentageYield, duration,qualification } = req.body;
  try {
    const manager = await Manager.findByPk(id);
    if (!manager) {
      throw customError(`manager to be updated with id ${id} not found in database`, 404)
    }
    if (req.file?.buffer) {
      manager.image = req.file.buffer
    }
    manager.lastName = lastName;
    manager.firstName = firstName;
    manager.minimumInvestmentAmount = minimumInvestmentAmount;
    manager.percentageYield = percentageYield;
    manager.duration = duration;
    manager.qualification= qualification
    
    await manager.save();

    return res.status(200).json({ message: 'Manager updated successfully' });
  } catch (error: any) {
    console.error('Error patchManager function:', error);
    return res.status(error.status || 500).json(error);
  }
}

export const deleteManager = async (req: Request, res: Response): Promise<Response> => {
  const { id } = req.params;
  try {
    const manager = await Manager.findByPk(id);
    if (!manager) {
      throw customError(`manager to be deleted with id ${id} not found in database`, 404)
    }
    await manager.destroy();
    return res.status(200).json({ message: 'Manager deleted successfully' });
  } catch (error: any) {
    console.error('Error deleteManager funciton:', error);
    return res.status(error.status || 500).json(error);
  }
}




