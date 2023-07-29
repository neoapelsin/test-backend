export interface IError {
    statusCode: number;
    message: string;
    timestamp: string;
    path: string;
}

export const errorDefaults: Pick<IError, 'message' | 'statusCode'> = {
    statusCode: 500,
    message: 'Internal server error',
};
