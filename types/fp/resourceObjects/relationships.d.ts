/// <reference types="ramda" />
import { CurriedFunction2, CurriedFunction3, CurriedFunction4 } from 'ramda';
import * as JsonApi from '../../structure';
/**
 * Return all relationships
 *
 * @param resourceObject
 */
export declare const relationships: (resourceObject: JsonApi.ResourceObject) => {};
/**
 * Return a single Relationship value
 *
 * @param relationshipName
 * @param resourceObject
 */
export declare const relationship: CurriedFunction2<string, JsonApi.ResourceObject, boolean | undefined>;
/**
 * Update the attributes of the Resource Object
 *
 * @param payload
 * @param resourceObject
 */
export declare const updateAttributes: CurriedFunction2<JsonApi.Attributes | undefined, JsonApi.ResourceObject, JsonApi.ResourceObject>;
/**
 * Add a relationship to the Resource Object by type and id
 *
 * @param relationshipName
 * @param type
 * @param id
 * @param resourceObject
 */
export declare const addRelationship: CurriedFunction4<string, string, string, JsonApi.ResourceObject, JsonApi.ResourceObject>;
/**
 * Removes a relationship from the Resource Object
 *
 * @param type
 * @param id
 * @param resourceObject
 */
export declare const removeRelationship: CurriedFunction3<string, string, JsonApi.ResourceObject, JsonApi.ResourceObject>;
/**
 * Set a to-one relationship to the given type and id
 *
 * @param relationship
 * @param type
 * @param id
 * @param resourceObject
 */
export declare const setRelationship: CurriedFunction4<string, string, string, JsonApi.ResourceObject, JsonApi.ResourceObject>;
