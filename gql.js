"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GQLErrorGroup = exports.GQLError = void 0;
class GQLError extends Error {
    constructor(error_data) {
        super(error_data.message);
        this.stack = error_data.extensions?.exception?.stacktrace?.join('\n');
    }
}
exports.GQLError = GQLError;
/** @deprecated */
class GQLErrorGroup extends Error {
    errors;
    constructor(errors) {
        super(errors.map(e => e.message).join('\n'));
        this.errors = errors;
    }
    static from_gql_errors(error_data) {
        return new GQLErrorGroup(error_data.map(e => new GQLError(e)));
    }
    static from_string(message) {
        return new GQLErrorGroup([new GQLError({ message })]);
    }
}
exports.GQLErrorGroup = GQLErrorGroup;
//# sourceMappingURL=gql.js.map