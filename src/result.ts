
interface IValue<T> {
    type: 'value'
    value: T
}

interface IError<E> {
    type: 'error'
    error: E
}

type ResultType<T, E> = IValue<T> | IError<E>


class ResultError extends Error {
    name = 'ResultError'

    constructor(message: string, public other?: any) {
        super(message + ': ' + other)
        this.stack = this.stack?.split('\n')
            .slice(6).join('\n')
    }
}


export class Result<T, E> {
    constructor(public result: ResultType<T, E>) { }

    static value<T>(value: T): Result<T, any> {
        return new Result({
            type: 'value',
            value,
        })
    }

    static error<E>(error: E): Result<any, E> {
        return new Result({
            type: 'error',
            error,
        })
    }

    unwrap(): T {
        switch (this.result.type) {
            case 'value': return this.result.value
            case 'error': throw new ResultError("Tried to .unwrap() on Result, but it contains an error", this.result.error)
        }
    }

    unwrap_err(): E {
        switch (this.result.type) {
            case 'value':
                throw new ResultError('Tried to .unwrap_err() on a Result, but it contains a value', this.result.value)
            case 'error': return this.result.error
        }
    }

    map<S>(f: (value: T) => S): Result<S, E> {
        switch (this.result.type) {
            case 'value':
                return new Result<S, E>({
                    type: 'value',
                    value: f(this.result.value),
                })
            case 'error': return this as any as Result<S, E>
        }
    }

    try_catch<F extends E, S>(f: (value: T) => S): Result<S, F> {
        switch (this.result.type) {
            case 'value':
                try {
                    return new Result<S, F>({
                        type: 'value',
                        value: f(this.result.value),
                    })
                } catch (e) {
                    return new Result<S, F>({
                        type: 'error',
                        error: e as F,
                    })
                }
            case 'error': return this as unknown as Result<S, F>
        }
    }

    val_as<S>(): Result<S, E> {
        return this as unknown as Result<S, E>
    }

    err_as<F extends E>(): Result<T, F> {
        return this as unknown as Result<T, F>
    }

    unwrap_or(d: T): T {
        switch (this.result.type) {
            case 'value': return this.result.value
            case 'error': return d
        }
    }

    is_ok(): boolean {
        return this.result.type === 'value'
    }

    is_err(): boolean {
        return this.result.type === 'error'
    }

    map_err<F>(f: (err: E) => F): Result<T, F> {
        switch (this.result.type) {
            case 'value': return this as any as Result<T, F>
            case 'error': return new Result<T, F>({
                    type: 'error',
                    error: f(this.result.error),
                })
        }
    }

    and_then<U>(f: (value: T) => Result<U, E>): Result<U, E> {
        switch (this.result.type) {
            case 'value': return f(this.result.value)
            case 'error': return this as any as Result<U, E>
        }
    }

    and_then_async<U>(f: (value: T) => Promise<Result<U, E>>): Promise<Result<U, E>> {
        switch (this.result.type) {
            case 'value': return f(this.result.value)
            case 'error': return this as any as Promise<Result<U, E>>
        }
    }

    or_else<F>(f: (err: E) => Result<T, F>): Result<T, F> {
        switch (this.result.type) {
            case 'value': return this as any as Result<T, F>
            case 'error': return f(this.result.error)
        }
    }

    or_else_async<F>(f: (err: E) => Promise<Result<T, F>>): Promise<Result<T, F>> {
        switch (this.result.type) {
            case 'value': return this as any as Promise<Result<T, F>>
            case 'error': return f(this.result.error)
        }
    }
}

export function Ok<T>(v: T): Result<T, any> {
    return Result.value(v)
}

export function Err<E>(e: E): Result<any, E> {
    return Result.error(e)
}

export function Maybe<T>(v: T | null | undefined): Result<T, Error> {
    if (v === null || v === undefined) {
        return Err(new Error('Not found.'))
    } else {
        return Ok(v!)
    }
}

export function Serr(message: string): Result<any, Error> {
    return Result.error(new Error(message))
}