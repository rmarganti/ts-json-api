import { prop } from 'ramda';

import * as JsonApi from '../../structure';
import { hasGivenId, mergeReverse } from '../../utils';

/**
 * Resource Object-related
 */
export * from './attributes';
export * from './relationships';

/**
 * Build a new Resource Object
 *
 * @param type
 * @param attributes
 * @param id
 */
export const buildResourceObject = (
    type: string,
    attributes: JsonApi.Attributes,
    id?: string
) => ({
    attributes,
    id,
    type,
});

/**
 * Return the `type` of a Resource Object
 */
export const type = prop('type');

/**
 * Return the `id` of a Resource Object
 */
export const id = prop('id');
