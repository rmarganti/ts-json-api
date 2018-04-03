/// <reference types="ramda" />
import * as JsonApi from '../../structure';
/**
 * Resource Object-related
 */
export * from './attributes';
export * from './relationships';
/**
 * Build a new Resource Object
 *
 * @param type
 * @param attributes
 * @param id
 */
export declare const buildResourceObject: (type: string, attributes: JsonApi.Attributes, id?: string | undefined) => {
    attributes: JsonApi.Attributes;
    id: string | undefined;
    type: string;
};
/**
 * Return the `type` of a Resource Object
 */
export declare const type: <T>(obj: Record<"type", T>) => T;
/**
 * Return the `id` of a Resource Object
 */
export declare const id: <T>(obj: Record<"id", T>) => T;
