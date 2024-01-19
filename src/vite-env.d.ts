/// <reference types="vite/client" />

declare const __IS_DEV__: boolean;
declare const __API_URL__: string;
declare const __APP_URL_PREFIX__: string;
declare const __RECAPTCHA_V2_PUBLIC__: string;
declare const __LIMIT_FILESIZE_MB__: number;

type DeepReadonly<T> = Readonly<{
    [K in keyof T]: T[K] extends number | string | symbol
        ? Readonly<T[K]>
        : T[K] extends Array<infer A>
          ? Readonly<Array<DeepReadonly<A>>>
          : DeepReadonly<T[K]>;
}>;
