import { Request, Response } from 'express';

import bcrypt from 'bcrypt';

import { Admin } from '../types/adminTypes';

import {
  generateChangePasswordToken,
  decodeJWT,
  generateEmailVerificationToken,
  createLoginJWT,
  encryptPassword,
  createNewPasswordToken,
} from '../helpers/authHelper';

import {
  ALREADY_VERIFIED_ROUTE,
  EMAIL_VERIFICATION_ERROR_ROUTE,
  ADMIN_CLIENT_DASHBOARD_ROUTE,
  NEW_PASSWORD_URL,
  CLIENT_DASHBOARD_ROUTE,
  EMAIL_VERIFICATION_ROUTE,
  CLIENT_DOMAIN
} from '../constants';
import { sendVerificationEmail, sendPasswordResetEmail } from '../service/mailService';
import { handleReferral } from '../helpers/investorHelpers';
import { customError } from '../helpers/commonHelpers';
import { Investment, Investor } from '../types/investorTypes';
import { Role } from '../common/authTypes'







export const createAdmin = async (req: Request, res: Response): Promise<Response> => {
  try {
    let { name, email, password } = req.body as {
      name: string,
      email: string,
      password: string
    };
    const existingAdmin = await Admin.findOne({ where: { email } });

    if (existingAdmin) {
      throw customError('Admin already exists', 409);
    }

    password = await encryptPassword(password);
    const admin = await Admin.create({ name, email, password });
    const verificationToken = generateEmailVerificationToken(admin);
    admin.verificationToken = verificationToken;
    await admin.save();

    await sendVerificationEmail(admin);
    return res.status(201).json(verificationToken);
  } catch (error: any) {
    console.error('error in createAdmin function', error)
    return res.status(error.status || 500).json(error);
  }
}

export const createInvestor = async (req: Request, res: Response) => {
  try {
    let { firstName, lastName, dateOfBirth, email, password, gender, country, bank, referralCode } = req.body;

    const existingInvestor = await Investor.findOne({ where: { email } });

    if (existingInvestor) {
      throw customError('Investor already exists', 409);
    }

    password = await encryptPassword(password);
    const newInvestor = await Investor.create({ firstName, lastName, dateOfBirth, email, password, gender, country, bank
     });
    newInvestor.referralCode = newInvestor.id + 2222;
    
    await Investment.create({
      amount: 0,
      amountDeposited: 0,
      isPaused: false,
      investorId: newInvestor.id,
      earnings: 0,
    });
    
    const token = generateEmailVerificationToken(newInvestor);
    newInvestor.verificationToken = token;
    await newInvestor.save();

    if (referralCode) {
      const refereeInvestor = await Investor.findOne({ where: { referralCode: referralCode } });
      if (refereeInvestor) {
        handleReferral(refereeInvestor, newInvestor);
      }
    }

    await sendVerificationEmail(newInvestor);
    return res.status(201).json(token);
  } catch (error: any) {
    console.error('Error registerInvestor function:', error);
    res.status(error.status || 500).json(error)
  }
}

export const login = async (req: Request, res: Response): Promise<Response> => {
  const { email, password } = req.body;

  try {
    let user: Admin | Investor | null = await Admin.findOne({ where: { email } });

    if (!user) {
      user = await Investor.findOne({ where: { email } });
    }

    if (!user) {
      throw customError('user not found', 404);
    }

    if (!user.isVerified) {
      const token = generateEmailVerificationToken(user);
      user.verificationToken = token
      user.save()
      await sendVerificationEmail(user);
      return res.status(201).json(token);
    }

    const passwordsMatch = await bcrypt.compare(password, user.password);

    if (passwordsMatch) {
      const loginToken = createLoginJWT(user)
      return res.status(200).json(loginToken)

    } else {
      throw customError('wrong password', 403);
    }
  } catch (error: any) {
    console.error('error in login function', error);
    return res.status(error.status || 500).json(error);
  }
}

export const verifyMail = async (req: Request, res: Response) => {
  const { token } = req.params;

  try {
    const decoded: any = decodeJWT(token);
    if (!decoded) {
      return res.status(401).redirect(EMAIL_VERIFICATION_ERROR_ROUTE);
    }
    const creationTimeMs = new Date(decoded.timeOfCreation).getTime();
    const currentTimeMs = Date.now();
    const expirationTimeMs = creationTimeMs + (10 * 60 * 1000); // Adding 10 minutes in milliseconds

    if (currentTimeMs >= expirationTimeMs) {
      return res.redirect(`${EMAIL_VERIFICATION_ROUTE}/`);
    }

    let user: Admin | Investor | null = await Admin.findOne({ where: { verificationToken: token } });

    if (!user) {
      user = await Investor.findOne({ where: { verificationToken: token } });

      if (!user) {
        throw customError('Illegal request, no such user', 404);
      }
    }
    if (user.isVerified) {
      return res.redirect(`${ALREADY_VERIFIED_ROUTE}/${user.email}`);
    }
    user.isVerified = true;
    await user.save();

    const jwToken = createLoginJWT(user);

    return user instanceof Admin ? res.redirect(`${CLIENT_DOMAIN}admin/dashboard/?token=${jwToken}`) : res.redirect(`${CLIENT_DOMAIN}dashboard/?token=${jwToken}`);

  } catch (error: any) {
    console.error('Error verifying email:', error);
    return res.status(error.status || 500).json(error);
  }
}
{ }
export const resendVerificationToken = async (req: Request, res: Response) => {
  const { email } = req.params;
  console.log(email)

  try {
    let user: Admin | Investor | null = await Admin.findOne({
      where: {
        email: email,
      }
    });

    if (!user) {
      user = await Investor.findOne({
        where: {
          email: email
        }
      });;
      if (!user) {
        throw customError('illegal request no such user', 404)
      }
    }
    const newToken = generateEmailVerificationToken(user);
    user.verificationToken = newToken;
    user.save();
    await sendVerificationEmail(user);
    return res.status(200).json(newToken);
  } catch (error: any) {
    res.status(error.status || 500).json(error);
  }
}

export const requestPasswordReset = async (req: Request, res: Response): Promise<Response> => {
  const { email } = req.body;

  try {
    let user: Admin | Investor | null = await Admin.findOne({ where: { email } });
    let role = 'admin';

    if (!user) {
      user = await Investor.findOne({ where: { email } });
      if (!user) {
        return res.status(404).json({ error: 'User not found.' });
      } else {
        role = 'investor';
      }
    }

    const resetToken = generateChangePasswordToken(user);
    user.changePasswordToken = resetToken;
    await user.save();

    await sendPasswordResetEmail(user);

    return res.status(200).send(resetToken);
  } catch (error) {
    console.error(error);
    return res.status(500).json(error);
  }
}

export const confirmMailForPasswordChange = async (req: Request, res: Response) => {
  const { token } = req.params;
  console.log(token)
  try {

    let user: Admin | Investor | null = await Admin.findOne({ where: { changePasswordToken: token } });

    if (!user) {
      user = await Investor.findOne({ where: { changePasswordToken: token } })
      if (!user) {
        return res.status(404).json({ error: 'User not found.' });
      }
    }

    const newtoken = createNewPasswordToken(user.id, user.email)

    return res.redirect(`${NEW_PASSWORD_URL}/?token=${newtoken}`)

  } catch (error) {
    console.error(error);
    return res.status(500).json(error);
  }
}

export const changePassword = async (req: Request, res: Response): Promise<Response> => {
  const { id } = req.params
  let { password } = req.body;
  console
  console.log(password)
  try {
    let user: any = await Admin.findByPk(id)
    let role = Role.ADMIN
    if (!user) {

      user = await Investor.findByPk(id);
      if (!user) {
        return res.status(404).json({ error: 'User not found.' });
      } else {
        role = Role.INVESTOR
      }
    }
    password = await encryptPassword(password)
    user.password = password
    if (!user.isVerified) {
      const token = generateEmailVerificationToken(user.id);

      user.verificationToken = token
      await user.save()
      await sendVerificationEmail(user);
      return res.status(201).json(token);
    }
    const loginToken = createLoginJWT(user)


    return res.status(200).json(loginToken)

  } catch (error: any) {
    console.error('Error changePassword :', error);
    return res.status(error.message || 500).json(error);
  }
}



