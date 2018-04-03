/**
 * Atttribute-related functions. Only applies to a single Resource Object.
 */

import {
    assocPath,
    curry,
    lensProp,
    over,
    path,
    pathOr,
    prop,
    CurriedFunction2,
    CurriedFunction3,
} from 'ramda';

import * as JsonApi from '../../structure';
import { mergeReverse } from '../../utils';

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
        path(['attributes', attributeName], resourceObject)
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
        attributeName: string,
        value: any,
        resourceObject: JsonApi.ResourceObject
    ) => assocPath(['attributes', attributeName], value, resourceObject)
);

/**
 * Update the attributes of the Resource Object
 *
 * @param payload
 * @param resourceObject
 */
export const updateAttributes = curry(
    (
        payload: JsonApi.Attributes = {},
        resourceObject: JsonApi.ResourceObject
    ) => over(lensProp('attributes'), mergeReverse(payload), resourceObject)
);
