/// <reference types="ramda" />
import * as JsonApi from './Structure';
import ResourceObject from './ResourceObject';
/**
 * Converts a Resource Object to an ResourceObject
 *
 * @param resourceObject
 */
export declare const convertToResourceObject: (resourceObject: JsonApi.iResourceObject<string, JsonApi.iAttributes>) => ResourceObject;
/**
 * If an Array is provided, it is converted to an Array of ResourceObjects.
 * If a single item is provided, it is converted to an ResourceObject
 */
export declare const convertToResourceObjectOrResourceObjects: (a: any) => any;
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
export declare const mergeReverse: (arg1: {}, arg0?: any) => <T2>(b: T2) => any;
/**
 * Determines if the provided Resource Object has the given ID
 *
 * @param id
 */
export declare const hasGivenId: (id: string) => (obj: any) => boolean;
