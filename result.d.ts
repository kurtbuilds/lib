interface IValue<T> {
    type: 'value';
    value: T;
}
interface IError<E> {
    type: 'error';
    error: E;
}
declare type ResultType<T, E> = IValue<T> | IError<E>;
export declare class Result<T, E> {
    result: ResultType<T, E>;
    constructor(result: ResultType<T, E>);
    static value<T>(value: T): Result<T, any>;
    static error<E>(error: E): Result<any, E>;
    unwrap(): T;
    unwrap_err(): E;
    map<S>(f: (value: T) => S): Result<S, E>;
    try_catch<F extends E, S>(f: (value: T) => S): Result<S, F>;
    val_as<S>(): Result<S, E>;
    err_as<F extends E>(): Result<T, F>;
    unwrap_or(d: T): T;
    is_ok(): boolean;
    is_err(): boolean;
    map_err<F>(f: (err: E) => F): Result<T, F>;
    and_then<U>(f: (value: T) => Result<U, E>): Result<U, E>;
    and_then_async<U>(f: (value: T) => Promise<Result<U, E>>): Promise<Result<U, E>>;
    or_else<F>(f: (err: E) => Result<T, F>): Result<T, F>;
    or_else_async<F>(f: (err: E) => Promise<Result<T, F>>): Promise<Result<T, F>>;
}
export declare function Ok<T>(v: T): Result<T, any>;
export declare function Err<E>(e: E): Result<any, E>;
export declare function Maybe<T>(v: T | null | undefined): Result<T, Error>;
export declare function Serr(message: string): Result<any, Error>;
export {};
