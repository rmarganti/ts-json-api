/// <reference types="ramda" />
import { CurriedFunction2, CurriedFunction3, CurriedFunction4 } from 'ramda';
import * as JsonApi from './Structure';
export declare const type: <T>(obj: Record<"type", T>) => T;
export declare const id: <T>(obj: Record<"id", T>) => T;
/**
 * Return all attributes
 */
export declare const attributes: <T>(obj: Record<"attributes", T>) => T;
/**
 * Return a single Attribute value
 *
 * string -> object -> any
 */
export declare const attribute: CurriedFunction2<string, JsonApi.iResourceObject<string, JsonApi.iAttributes>, boolean>;
/**
 * Return all iRelationships
 *
 * object -> object
 */
export declare const relationships: <U, V>(obj: U) => V;
/**
 * Return a single Relationship value
 *
 * string -> object -> any
 */
export declare const relationship: CurriedFunction2<string, JsonApi.iResourceObject<string, JsonApi.iAttributes>, boolean>;
/**
 * Update the attributes of the Resource Object
 *
 * object -> object -> object
 */
export declare const updateAttributes: CurriedFunction2<JsonApi.iAttributes | undefined, JsonApi.iResourceObject<string, JsonApi.iAttributes>, JsonApi.iResourceObject<string, JsonApi.iAttributes>>;
/**
 * Add a relationship to the Resource Object by type and id
 *
 * @param relationship
 * @param typeOrResource Object
 * @param id
 */
export declare const addRelationship: CurriedFunction4<string, string, string, JsonApi.iResourceObject<string, JsonApi.iAttributes>, JsonApi.iResourceObject<string, JsonApi.iAttributes>>;
/**
 * Removes a relationship from the Resource Object
 *
 * @param type
 * @param id
 */
export declare const removeRelationship: CurriedFunction3<string, string, JsonApi.iResourceObject<string, JsonApi.iAttributes>, JsonApi.iResourceObject<string, JsonApi.iAttributes>>;
/**
 * Set a to-one relationship to the given type and id
 *
 * @param relationship
 * @param typeOrResource Object
 * @param id
 */
export declare const setRelationship: CurriedFunction4<string, string, string, JsonApi.iResourceObject<string, JsonApi.iAttributes>, JsonApi.iResourceObject<string, JsonApi.iAttributes>>;
