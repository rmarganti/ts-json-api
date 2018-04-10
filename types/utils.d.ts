/// <reference types="ramda" />
import * as JsonApi from './structure';
import ApiResourceObject from './ApiResourceObject';
/**
 * Converts a Resource Object to an ResourceObject
 *
 * @param resourceObject
 */
export declare const convertToApiResourceObject: (resourceObject: JsonApi.ResourceObject) => ApiResourceObject<JsonApi.ResourceObject>;
/**
 * If an Array is provided, it is converted to an Array of ApiResourceObjects.
 * If a single item is provided, it is converted to an ApiResourceObject
 */
export declare const convertToApiResourceObjectOrObjects: (a: any) => any;
/**
 * A predicate that determines if the provided value is defined
 *
 * @param item
 */
export declare const isDefined: (item: any) => boolean;
/**
 * Merge util that moves from left-to-right,
 * useful for merging small data sets into larger
 * data collections
 */
export declare const mergeReverse: (arg1: {}, arg0?: {} | undefined) => <T2>(b: T2) => T2 & {};
/**
 * Determines if the provided Resource Object has the given ID
 *
 * @param id
 */
export declare const hasGivenId: (id: string) => (obj: any) => boolean;
