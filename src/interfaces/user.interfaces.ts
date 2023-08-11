import { UserRequest } from '../middleware/auth';

// Custom interface extending Express.Request and adding the file property from multer
export interface FileRequest extends UserRequest {
  file?: Express.Multer.File;
}


export interface PosibleUser {
  id?: number, 
  email: string,
  password: string, 
  dni?: number, 
  location?: string,
  phone?: number, 
  name?: string, 
  lastname?: string, 
  fullName?: string, 
  username?: string, 
  birth_date?: Date,
}

