import {
    append,
    curry,
    lensPath,
    lensProp,
    over,
    path,
    prop,
    propOr,
    reject,
    set,
    CurriedFunction2,
    CurriedFunction3,
    CurriedFunction4,
} from 'ramda';

import { hasGivenId, mergeReverse } from './utils';
import * as JsonApi from './Structure';
import { iResourceObject } from './index';

export const type = prop('type');
export const id = prop('id');

/**
 * Return all attributes
 *
 * @param resourceObject
 */
export const attributes = (resourceObject: iResourceObject) =>
    prop('attributes', resourceObject);

/**
 * Return a single Attribute value
 *
 * @param attributeName
 * @param resourceObject
 */
export const attribute = curry(
    (attributeName: string, resourceObject: iResourceObject) =>
        path(['attributes', name], resourceObject)
);

/**
 * Return all relationships
 *
 * @param resourceObject
 */
export const relationships = (resourceObject: iResourceObject) =>
    propOr({}, 'relationships', resourceObject);

/**
 * Return a single Relationship value
 *
 * @param relationshipName
 * @param resourceObject
 */
export const relationship = curry(
    (relationshipName: string, resourceObject: iResourceObject) =>
        path(['relationships', name, 'data'], resourceObject)
);

/**
 * Update the attributes of the Resource Object
 *
 * @param payload
 * @param resourceObject
 */
export const updateAttributes = curry(
    (payload: JsonApi.iAttributes = {}, resourceObject: iResourceObject) =>
        over(lensProp('attributes'), mergeReverse(payload), resourceObject)
);

/**
 * Add a relationship to the Resource Object by type and id
 *
 * @param relationshipName
 * @param type
 * @param id
 * @param resourceObject
 */
export const addRelationship = curry(
    (
        relationshipName: string,
        type: string,
        id: string,
        resourceObject: iResourceObject
    ) =>
        over(
            lensPath(['relationships', relationshipName, 'data']),
            append({ type, id }),
            resourceObject
        )
);

/**
 * Removes a relationship from the Resource Object
 *
 * @param type
 * @param id
 * @param resourceObject
 */
export const removeRelationship = curry(
    (type: string, id: string, resourceObject: iResourceObject) =>
        over(
            lensPath(['relationships', type, 'data']),
            reject(hasGivenId(id)),
            resourceObject
        )
);

/**
 * Set a to-one relationship to the given type and id
 *
 * @param relationship
 * @param type
 * @param id
 * @param resourceObject
 */
export const setRelationship = curry(
    (
        relationship: string,
        type: string,
        id: string,
        resourceObject: iResourceObject
    ) =>
        set(
            lensPath(['relationships', relationship, 'data']),
            { type, id },
            resourceObject
        )
);
