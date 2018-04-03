import * as JsonApi from '../../src/structure';

export interface Article extends JsonApi.ResourceObject {
    type: 'articles';
    attributes: {
        title: string;
    };
}

export type ArticleItemResponse = JsonApi.Response<Article>;
export type ArticleCollectionResponse = JsonApi.Response<Article[]>;
