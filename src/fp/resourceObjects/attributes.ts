/**
 * Atttribute-related functions. Only applies to a single Resource Object.
 */

import {
    assoc,
    curry,
    path,
    pathOr,
    prop,
    CurriedFunction2,
    CurriedFunction3,
} from 'ramda';

import * as JsonApi from '../../structure';

/**
 * Return all attributes.
 *
 * @param resourceObject
 */
export const attributes = (resourceObject: JsonApi.ResourceObject) =>
    prop('attributes', resourceObject);

/**
 * Return a single Attribute value.
 *
 * @param attributeName
 * @param resourceObject
 */
export const attribute = curry(
    (attributeName: string, resourceObject: JsonApi.ResourceObject) =>
        path(['attributes', name], resourceObject)
);

/**
 * Return a single Attribute value, with a default fallback.
 *
 * @param attributeName
 * @param resourceObject
 */
export const attributeOr = curry(
    (
        defaultValue: any,
        attributeName: string,
        resourceObject: JsonApi.ResourceObject
    ) => pathOr(defaultValue, ['attributes', name], resourceObject)
);

/**
 * Set the value of an attribute.
 *
 * @param value
 * @param attributeName
 * @param resourceObject
 */
export const setAttribute = curry(
    (
        value: any,
        attributeName: string,
        resourceObject: JsonApi.ResourceObject
    ) => assoc(value, attributeName, resourceObject)
);
