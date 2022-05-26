"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Serr = exports.Maybe = exports.Err = exports.Ok = exports.Result = void 0;
class ResultError extends Error {
    other;
    name = 'ResultError';
    constructor(message, other) {
        super(message + ': ' + other);
        this.other = other;
        this.stack = this.stack?.split('\n')
            .slice(6).join('\n');
    }
}
class Result {
    result;
    constructor(result) {
        this.result = result;
    }
    static value(value) {
        return new Result({
            type: 'value',
            value,
        });
    }
    static error(error) {
        return new Result({
            type: 'error',
            error,
        });
    }
    unwrap() {
        switch (this.result.type) {
            case 'value': return this.result.value;
            case 'error': throw new ResultError("Tried to .unwrap() on Result, but it contains an error", this.result.error);
        }
    }
    unwrap_err() {
        switch (this.result.type) {
            case 'value':
                throw new ResultError('Tried to .unwrap_err() on a Result, but it contains a value', this.result.value);
            case 'error': return this.result.error;
        }
    }
    map(f) {
        switch (this.result.type) {
            case 'value':
                return new Result({
                    type: 'value',
                    value: f(this.result.value),
                });
            case 'error': return this;
        }
    }
    try_catch(f) {
        switch (this.result.type) {
            case 'value':
                try {
                    return new Result({
                        type: 'value',
                        value: f(this.result.value),
                    });
                }
                catch (e) {
                    return new Result({
                        type: 'error',
                        error: e,
                    });
                }
            case 'error': return this;
        }
    }
    val_as() {
        return this;
    }
    err_as() {
        return this;
    }
    unwrap_or(d) {
        switch (this.result.type) {
            case 'value': return this.result.value;
            case 'error': return d;
        }
    }
    is_ok() {
        return this.result.type === 'value';
    }
    is_err() {
        return this.result.type === 'error';
    }
    map_err(f) {
        switch (this.result.type) {
            case 'value': return this;
            case 'error': return new Result({
                type: 'error',
                error: f(this.result.error),
            });
        }
    }
    and_then(f) {
        switch (this.result.type) {
            case 'value': return f(this.result.value);
            case 'error': return this;
        }
    }
    and_then_async(f) {
        switch (this.result.type) {
            case 'value': return f(this.result.value);
            case 'error': return this;
        }
    }
    or_else(f) {
        switch (this.result.type) {
            case 'value': return this;
            case 'error': return f(this.result.error);
        }
    }
    or_else_async(f) {
        switch (this.result.type) {
            case 'value': return this;
            case 'error': return f(this.result.error);
        }
    }
}
exports.Result = Result;
function Ok(v) {
    return Result.value(v);
}
exports.Ok = Ok;
function Err(e) {
    return Result.error(e);
}
exports.Err = Err;
function Maybe(v) {
    if (v === null || v === undefined) {
        return Err(new Error('Not found.'));
    }
    else {
        return Ok(v);
    }
}
exports.Maybe = Maybe;
function Serr(message) {
    return Result.error(new Error(message));
}
exports.Serr = Serr;
//# sourceMappingURL=result.js.map