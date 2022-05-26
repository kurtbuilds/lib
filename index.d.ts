export * as result from './result';
export * as gql from './gql';
export { Err, Ok, Result, Serr, Maybe } from './result';
export { Alert, AlertType } from './alert';
export { GQLErrorGroup } from './gql';
export declare type Cent = bigint;
export declare type EmailAddress = string;
export declare const NULL_UUID = "00000000-0000-0000-0000-000000000000";
export declare function infallible(t: never): never;
export declare function unimplemented(): never;
declare type KeysOfType<T, SelectedType> = {
    [key in keyof T]: SelectedType extends T[key] ? key : never;
}[keyof T];
declare type Optional<T> = Partial<Pick<T, KeysOfType<T, undefined>>>;
declare type Required<T> = Omit<T, KeysOfType<T, undefined>>;
declare type OptionalUndefined<T> = Optional<T> & Required<T>;
declare type AddUndefinedToNullable<T extends {}> = {
    [K in keyof T]: K extends "uuid" | "created_at" ? T[K] | undefined : T[K] extends NonNullable<T[K]> ? T[K] : T[K] | undefined;
};
export declare type OptionalNullableFields<T> = OptionalUndefined<AddUndefinedToNullable<T>>;
