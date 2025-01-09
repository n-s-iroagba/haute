import { Request,Response } from 'express'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import { Investor } from '../types/investorTypes'
import { Admin } from '../types/adminTypes'
import {Role,TokenType,DecodedVerificationToken} from '../common/authTypes'

const JWT_SECRET = 'ababanna'

export const encryptPassword = (password:string) => {
  return bcrypt.hash(password, 10)
}
export const decodeJWT = (token:string) => {
  return jwt.verify(token, JWT_SECRET);
}

export const createLoginJWT = (user:Investor|Admin) => {
  const role = user instanceof Investor? Role.INVESTOR : Role.ADMIN
  const name = user instanceof Investor? user.firstName:user.name;
  return jwt.sign({ id: user.
    id, email: user.email, username: name, role: role, verified:user.isVerified,type:TokenType.LOGIN_TYPE }, JWT_SECRET);
}

export const generateEmailVerificationToken = (user:Admin|Investor) => {
  const role = user instanceof Admin? Role.ADMIN:Role.INVESTOR;
  const token = jwt.sign({ role:role,email:user.email,type:TokenType.VERIFICATION_TYPE, timeOfCreation: new Date() } as DecodedVerificationToken, JWT_SECRET, {
    algorithm: 'HS256',
    expiresIn: '1h',
  });
  return token;
};
export const generateChangePasswordToken = (user:Admin|Investor) => {
  const role = user instanceof Admin? Role.ADMIN:Role.INVESTOR;
  return jwt.sign({ id: user.id, role:role, type:TokenType.CHANGE_PASSWORD, timeOfCreation: new Date() }, JWT_SECRET);
}

export const createNewPasswordToken = (id:number, email: string) => {
  return jwt.sign({ id: id, email: email, }, JWT_SECRET);
}

export const isAdmin =(req:Request, res:Response, next: any) => {
  const token = req.headers['authorization'];
  if (!token) {
    return res.status(403).send({ auth: false, message: 'No token provided.' });
  }
  jwt.verify(token, JWT_SECRET, (err, decoded:any) => {
    if (err) {
      return res.status(500).send({ auth: false, message: 'Failed to authenticate token.' });
    }
    const role = decoded?decoded.role:'';
    if (role === 'admin'){
      next();
    } else {
      return res.status(403).send({ auth: false, message: 'You are not authorized to access this resource.' });
    }
  });
};

export const isInvestor =(req:Request, res:Response, next:any) => {
  const token = req.headers['authorization'];
  if (!token) {
    return res.status(403).send({ auth: false, message: 'No token provided.' });
  }
  jwt.verify(token, JWT_SECRET, (err, decoded:any) => {
    if (err) {
      return res.status(500).send({ auth: false, message: 'Failed to authenticate token.' });
    }
    const role = decoded.role;
    if (role === 'investor'){
      next();
    } else {
      return res.status(403).send({ auth: false, message: 'You are not authorized to access this resource.' });
    }
  });
};




