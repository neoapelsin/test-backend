import {
    ArgumentsHost,
    Catch,
    ExceptionFilter,
    HttpStatus,
    NotFoundException,
} from '@nestjs/common';
import { QueryFailedError } from 'typeorm';
import { IError } from '../domain/types/error.interface';

@Catch()
export class BalanceExceptionFilter implements ExceptionFilter {
    catch(
        exception: QueryFailedError | NotFoundException,
        host: ArgumentsHost,
    ) {
        const ctx = host.switchToHttp();
        const response = ctx.getResponse();
        const request = ctx.getRequest();

        const error: IError = {
            statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
            message: 'Internal server error',
            timestamp: new Date().toISOString(),
            path: request.url,
        };

        if (exception instanceof NotFoundException) {
            error.statusCode = HttpStatus.NOT_FOUND;
            error.message = 'User not found';
        }

        if (exception instanceof QueryFailedError) {
            error.statusCode = HttpStatus.BAD_REQUEST;
            error.message = 'Insufficient balance';
        }

        response.status(error.statusCode).json(error);
    }
}
