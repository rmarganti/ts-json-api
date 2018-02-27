# ts-json-api

A collection of TypeScript interfaces and classes for working with [JSONAPI.org](http://jsonapi.org/)-standard requests/responses.

## Interfaces

There library supports JSONAPI standard in all its variations. Therefore, there are a number of interfaces you may find useful.

### JsonApiResponse

This is the main interface. It works with any acceptable combination of `JsonApiResponseWithData`, `JsonApiResponseWithError`, & `JsonApiResponseWithMeta`. If you need to target specifc response types, it is recommend you use those more specific interfaces (covered below).

### JsonApiResponseWithData

Use this if you know that the data is a valid JSONAPI response with data. This requires a `data` property (with either a `ResourceObject` or array of `ResourceObject`'s). It may or may not also have includes (`included`) and `links`.

### JsonApiResponseWithError

If your response contains an error, you can target with this interface.

### JsonApiResponseWithmeta

If your response contains only meta data (not super common), this interface can be help

### ResourceObject

This represents a single ResourceObject in a JSONAPI response. The `data` attribute in a JSONAPI response either a `ResourceObject` or an array of `ResourceObject`'s

### Other interfaces

Due to JSONAPI's nested structure, it is constructed of a decent number of individual pieces. We recommend taking a look at `src/JsonAPIStructure.ts` for reference. Should you need to target more specific pieces of a response, it should be pretty self-explanitory.

## The `ResourceObject` class

`ts-json-api` provides an ResourceObject class that is helpful for acessing Resource Object data and updating it in an immutable way. All functions on the `ResourceObject` class will return a new `ResourceObject`, unaffecting the original.

### Example Usage

```js
import { ResourceObject } from 'ts-json-api';

const exampleInput = {
    "type": "articles",
    "id": "1",
    "attributes": {
      "title": "JSON API paints my bikeshed!"
    },
    "relationships": {
      "author": {
        "links": {
          "self": "http://example.com/articles/1/relationships/author",
          "related": "http://example.com/articles/1/author"
        },
        "data": { "type": "people", "id": "9" }
      },
      "comments": {
        "links": {
          "self": "http://example.com/articles/1/relationships/comments",
          "related": "http://example.com/articles/1/comments"
        },
        "data": [
          { "type": "comments", "id": "5" },
          { "type": "comments", "id": "12" }
        ]
      }
    },
    "links": {
      "self": "http://example.com/articles/1"
    }
  }
};

const article = new ResourceObject(exampleInput);

console.log(article.type());
// "articles"

console.log(article.id());
// "1"

console.log(article.attributes());
/// {
///     "title": "JSON API paints my bikeshed!"
/// }

console.log(article.attribute('title'));
// "JSON API paints my bikeshed"

const updatedArticle = article.update({ title: "New Title" });

console.log(updatedArticle.attribute('title'));
// "New Title"

console.log(article.attribute('title'))
// "JSON API paints my bikeshed"
// > NOTE: The original `article` is not affected


/**
 * Relationships
 */
const relationships = article.relationships();

console.log(relationships.author.id());
// "9"
// Note that all relationship(s)-fetching methods return ResourceObject/ResourceObjects representing those relationship objects

console.log(
    relationships.comments[0].id(),
    relationships.comments[1].id()
);
// "5", "12"

console.log(article.relationship('author').id());
// "9"

// You "add" a relationship when the relationship represents a collection (ie. comments).
const updatedArticle = article.addRelationship('comments', 'comments', '432');
const updatedArticle = article.addRelationship('comments', CommentResourceObject);

// You "set" a relationships when the relationship represents a single item (ie. author)
const updatedArticle = article.setRelationship('editor', 'people', '123');
const updatedArticle = article.setRelationship('editor', PeopleResourceObject);

// You can also remove a relationship
const updatedArticle = article.removeRelationship('comments', '9');

/**
 *  Other helpful methods
 */

// Helpful for posting to an API and/or working with other libraries
article.toJSON()

// Maybe your API call doesn't want to include relationship info
article.withoutRelationships().toJSON()
```
