import {
    append,
    curry,
    path,
    lensPath,
    lensProp,
    over,
    propOr,
    reject,
    set,
    CurriedFunction2,
    CurriedFunction3,
    CurriedFunction4,
} from 'ramda';

import * as JsonApi from '../../structure';
import { mergeReverse, hasGivenId } from '../../utils';

/**
 * Return all relationships
 *
 * @param resourceObject
 */
export const relationships = (resourceObject: JsonApi.ResourceObject) =>
    propOr({}, 'relationships', resourceObject);

/**
 * Return a single Relationship value
 *
 * @param relationshipName
 * @param resourceObject
 */
export const relationship = curry(
    (relationshipName: string, resourceObject: JsonApi.ResourceObject) =>
        path(['relationships', name, 'data'], resourceObject)
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
        resourceObject: JsonApi.ResourceObject
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
    (type: string, id: string, resourceObject: JsonApi.ResourceObject) =>
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
        resourceObject: JsonApi.ResourceObject
    ) =>
        set(
            lensPath(['relationships', relationship, 'data']),
            { type, id },
            resourceObject
        )
);
