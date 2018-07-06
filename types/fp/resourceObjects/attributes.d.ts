/**
 * Atttribute-related functions. Only applies to a single Resource Object.
 */
import { CurriedFunction2, CurriedFunction3 } from 'ramda';
import * as JsonApi from '../../structure';
/**
 * Return all attributes.
 *
 * @param resourceObject
 */
export declare const attributes: (resourceObject: JsonApi.ResourceObject) => JsonApi.Attributes | undefined;
/**
 * Return a single Attribute value.
 *
 * @param attributeName
 * @param resourceObject
 */
export declare const attribute: CurriedFunction2<string, JsonApi.ResourceObject, boolean | undefined>;
/**
 * Return a single Attribute value, with a default fallback.
 *
 * @param attributeName
 * @param resourceObject
 */
export declare const attributeOr: CurriedFunction3<any, string, JsonApi.ResourceObject, any>;
/**
 * Set the value of an attribute.
 *
 * @param value
 * @param attributeName
 * @param resourceObject
 */
export declare const setAttribute: CurriedFunction3<string, any, JsonApi.ResourceObject, JsonApi.ResourceObject>;
/**
 * Update the attributes of the Resource Object
 *
 * @param payload
 * @param resourceObject
 */
export declare const updateAttributes: CurriedFunction2<JsonApi.Attributes | undefined, JsonApi.ResourceObject, JsonApi.ResourceObject>;
