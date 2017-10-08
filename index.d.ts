export interface Attributes {
    [index: string]: string | number | boolean,
}

export interface Relationships {
    [index: string]: {
        data: ResourceObject | ResourceObject[],
        links?: Links,
        meta?: Meta,
    },
}

export interface LinkObject {
  href: string,
  meta: Meta,
}

export interface Links {
    [index: string]: string | LinkObject,
}

export interface Meta {
  [index: string]: any,
}

export interface ResourceObject {
    type: string,
    id?: string,
    attributes?: Attributes,
    relationships?: Relationships,
    links?: Links,
}

export interface JsonApiResponse {
  data: ResourceObject | ResourceObject[],
  included?: ResourceObject[],
  links: Links,
  meta: Meta,
}
