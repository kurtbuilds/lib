interface GQLExceptionInfo {
    stacktrace?: string[]
}

interface GQLErrorExtension {
    exception: GQLExceptionInfo & any
    variant?: 'danger' | 'success'
}

interface GQLErrorData {
    message: string,
    extensions?: GQLErrorExtension,
}

export class GQLError extends Error {
    constructor(error_data: GQLErrorData) {
        super(error_data.message)
        this.stack = error_data.extensions?.exception?.stacktrace?.join('\n')
    }
}


/** @deprecated */
export class GQLErrorGroup extends Error {
    public errors: GQLError[]

    constructor(errors: GQLError[]) {
        super(errors.map(e => e.message).join('\n'))
        this.errors = errors
    }

    static from_gql_errors(error_data: GQLErrorData[]): GQLErrorGroup {
        return new GQLErrorGroup(error_data.map(e => new GQLError(e)))
    }

    static from_string(message: string): GQLErrorGroup {
        return new GQLErrorGroup([new GQLError({message})])
    }
}