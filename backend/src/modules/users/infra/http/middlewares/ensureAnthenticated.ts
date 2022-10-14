import { Request, Response, NextFunction } from 'express';
import { verify } from 'jsonwebtoken';
import authConfig from '@config/auth';
import AppError from '@shared/errors/AppError';

interface TokenPayload {
    iat: number;
    exp: number;
    sub: string;
}

export default function ensureAuthenticated(
    request: Request,
    response: Response,
    next: NextFunction,
): void {
    //Validação do token JWT

    const authHeader = request.headers.authorization;

    // Verificar se token existe
    if (!authHeader) {
        throw new AppError('JWT token is missing', 401);
    }

    // Separando token: Bearer DWAKOIDKAWDKAW
    const [, token] = authHeader.split(' ');

    try {
        // Decodificando token
        const decoded = verify(token, authConfig.jwt.secret);

        console.log(decoded);

        const { sub } = decoded as TokenPayload;

        request.user = {
            cpf: sub,
        };

        return next();
    } catch {
        throw new AppError('Invalid JWT token', 401);
    }
}
