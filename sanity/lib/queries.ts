import { defineQuery } from 'next-sanity'

export const BLOGS_QUERY = defineQuery(`*[_type == 'post' && defined(slug.current)] {
    _id,
    title,
    slug,
    _createdAt,
    author -> {
      _id,
      name,
      image
    },
    body,
    "categories": categories[]->{
      _id,
      title,
      slug
    },
    "mainImageUrl": mainImage.asset->url,
    "mainImageAlt": mainImage.alt
}`)

export const BLOG_BY_SLUG_QUERY = defineQuery(`*[_type == "post" && slug.current == $slug][0]{
    _id,
    title,
    slug,
    _createdAt,
    author -> {
      _id,
      name,
      image
    },
    body,
    "categories": categories[]->{
      _id,
      title,
      slug
    },
    "mainImageUrl": mainImage.asset->url,
    "mainImageAlt": mainImage.alt
}`)

export const AUTHOR_BY_GOOGLE_ID_QUERY = defineQuery(`*[_type == "author" && id == $id][0]{
    _id,
    id,
    name,
    email,
    image
  }`)
