export * as result from './result'
export * as gql from './gql'

export {Err, Ok, Result, Serr, Maybe} from './result'
export {Alert, AlertType} from './alert'
export {GQLErrorGroup} from './gql'

export type Cent = bigint
export type EmailAddress = string

export const NULL_UUID = '00000000-0000-0000-0000-000000000000'


export function infallible(t: never): never {
    throw new Error('Reached infallible but that shouldn\'t be possible.')
}


export function unimplemented(): never {
    throw new Error('This codepath has not been implemented.')
}


type KeysOfType<T, SelectedType> = {
    [key in keyof T]: SelectedType extends T[key] ? key : never;
}[keyof T];

type Optional<T> = Partial<Pick<T, KeysOfType<T, undefined>>>;

type Required<T> = Omit<T, KeysOfType<T, undefined>>;

type OptionalUndefined<T> = Optional<T> & Required<T>;

type AddUndefinedToNullable<T extends {}> = {
    [K in keyof T]: K extends "uuid" | "created_at"
        ? T[K] | undefined
        : T[K] extends NonNullable<T[K]>
            ? T[K]
            : T[K] | undefined
}

export type OptionalNullableFields<T> = OptionalUndefined<AddUndefinedToNullable<T>>