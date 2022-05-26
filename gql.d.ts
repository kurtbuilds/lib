interface GQLExceptionInfo {
    stacktrace?: string[];
}
interface GQLErrorExtension {
    exception: GQLExceptionInfo & any;
    variant?: 'danger' | 'success';
}
interface GQLErrorData {
    message: string;
    extensions?: GQLErrorExtension;
}
export declare class GQLError extends Error {
    constructor(error_data: GQLErrorData);
}
/** @deprecated */
export declare class GQLErrorGroup extends Error {
    errors: GQLError[];
    constructor(errors: GQLError[]);
    static from_gql_errors(error_data: GQLErrorData[]): GQLErrorGroup;
    static from_string(message: string): GQLErrorGroup;
}
export {};
