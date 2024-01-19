import { AxiosError, AxiosResponse } from 'axios';

export class RequestError extends AxiosError {
    constructor(
        // eslint-disable-next-line no-unused-vars
        public readonly errors: string[],
        // eslint-disable-next-line no-unused-vars
        public readonly code?: string,
        // eslint-disable-next-line  no-unused-vars, @typescript-eslint/no-explicit-any
        public readonly response?: AxiosResponse<unknown, any>,
    ) {
        super('Request error');
        this.name = 'RequestError';
    }
}
