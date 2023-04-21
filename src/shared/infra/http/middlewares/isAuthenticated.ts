import { NextFunction, Request, Response } from 'express';
import AppError from '@shared/errors/AppError';
import { verify } from 'jsonwebtoken';
import authConfig from '@config/auth';

//interface para pegar os dados do token
interface ITokenPayload {
  iate: number;
  exp: number;
  sub: string;
}

export default function isAuthenticated(
  request: Request,
  response: Response,
  next: NextFunction
): void {
  const authHeader = request.headers.authorization;

  if (!authHeader) {
    throw new AppError('JWT Token is missing.');
  }
  // Bearer fajdsfalçsdfçlasdfepopojkafsçdffaç modelo do token
  const [, token] = authHeader.split(' '); //separando em dois array e pegando somente o token

  try {
    //verificando com o verify do jwt, se o token foi criado com a msma secret
    const decodedToken = verify(token, authConfig.jwt.secret);

    const { sub } = decodedToken as ITokenPayload;

    //usando @Override de tipagem
    request.user = {
      id: sub
    };

    return next();
  } catch {
    throw new AppError('Invalid JWT Token');
  }
}
