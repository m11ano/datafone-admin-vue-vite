import { AxiosError, AxiosResponse } from 'axios';

export class RequestError extends AxiosError {
    constructor(
        public readonly errors: string[],
        public readonly code?: string,
        // eslint-disable-next-line  @typescript-eslint/no-explicit-any
        public readonly response?: AxiosResponse<unknown, any>,
    ) {
        super('Request error');
        this.name = 'RequestError';
    }
}
