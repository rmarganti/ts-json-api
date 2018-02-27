import {
    append,
    curry,
    ifElse,
    lensPath,
    lensProp,
    over,
    path,
    prop,
    propEq,
    propOr,
    reject,
    set,
} from 'ramda';

import { hasGivenId, isDefined, mergeReverse } from './utils';
import { iAttributes } from './JsonAPIStructure';
import { iResourceObject } from './index';

export const type = prop('type');
export const id = prop('id');

/**
 * Return all attributes
 */
export const attributes = prop('attributes');

/**
 * Return a single Attribute value
 *
 * string -> object -> any
 */
export const attribute = curry(
    (name: string, resourceObject: iResourceObject) =>
        path(['attributes', name], resourceObject)
);

/**
 * Return all iRelationships
 *
 * object -> object
 */
export const relationships = propOr({}, 'relationships');

/**
 * Return a single Relationship value
 *
 * string -> object -> any
 */
export const relationship = curry(
    (name: string, resourceObject: iResourceObject) =>
        path(['relationships', name, 'data'], resourceObject)
);

/**
 * Update the attributes of the Resource Object
 *
 * object -> object -> object
 */
export const updateAttributes = curry(
    (payload: iAttributes = {}, resourceObject: iResourceObject) =>
        over(lensProp('attributes'), mergeReverse(payload), resourceObject)
);

/**
 * Add a relationship to the Resource Object by type and id
 *
 * @param relationship
 * @param typeOrResource Object
 * @param id
 */
export const addRelationship = curry(
    (
        relationship: string,
        type: string,
        id: string,
        resourceObject: iResourceObject
    ) =>
        over(
            lensPath(['relationships', relationship, 'data']),
            append({ type, id }),
            resourceObject
        )
);

/**
 * Removes a relationship from the Resource Object
 *
 * @param type
 * @param id
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
 * @param typeOrResource Object
 * @param id
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
