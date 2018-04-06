import * as JsonApi from '../../src/structure';

export interface Article extends JsonApi.ResourceObject {
    type: 'articles';
    attributes: {
        title: string;
    };
    relationships: {
        author: JsonApi.Relationship<Person>;
        comments: JsonApi.Relationship<Comment[]>;
    };
}

export type ArticleItemResponse = JsonApi.Response<Article>;
export type ArticleCollectionResponse = JsonApi.Response<Article[]>;

export interface Person extends JsonApi.ResourceObject {
    type: 'people';
    attributes: {
        'first-name': string;
        'last-name': string;
        twitter: string;
    };
}

export interface Comment extends JsonApi.ResourceObject {
    type: 'comments';
    attributes: {
        body: string;
    };
}
