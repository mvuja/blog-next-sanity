import { defineQuery } from 'next-sanity'

export const BLOGS_QUERY = defineQuery(`*[_type == 'post' && defined(slug.current)] | order(_createdAt desc) {
    _id,
    title,
    slug,
    description,
    _createdAt,
    author -> {
      _id,
      name,
      image
    },
    views,
    body,
    "categories": categories[]->{
      _id,
      title,
      slug
    },
    "mainImageUrl": mainImage.asset->url,
    "mainImageAlt": mainImage.alt
}`)

export const BLOGS_SEARCH_QUERY =
	defineQuery(`*[_type == 'post' && defined(slug.current) && !defined($search) || title match $search || categories->title match $search || author->name match $search] | order(_createdAt desc) {
    _id,
    title,
    slug,
    description,
    _createdAt,
    author -> {
      _id,
      name,
      image
    },
    views,
    body,
    "categories": categories[]->{
      _id,
      title,
      slug
    },
    "mainImageUrl": mainImage.asset->url,
    "mainImageAlt": mainImage.alt
}`)

export const BLOG_BY_SLUG_QUERY = defineQuery(`*[_type == 'post' && slug.current == $slug][0]{
    _id,
    title,
    slug,
    _createdAt,
    author -> {
      _id,
      name,
      image
    },
    views,
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

export const SORTED_BLOGS_BY_DATE_QUERY =
	defineQuery(`*[_type == 'post' && defined(slug.current)  && !defined($search) || title match $search || categories->title match $search || author->name match $search] | order(_createdAt desc) {
    _id,
    title,
    slug,
    description,
    _createdAt,
    author -> {
      _id,
      name,
      image
    },
    views,
    body,
    "categories": categories[]->{
      _id,
      title,
      slug
    },
    "mainImageUrl": mainImage.asset->url,
    "mainImageAlt": mainImage.alt
}`)

export const SORTED_BLOGS_BY_TITLE_QUERY =
	defineQuery(`*[_type == 'post' && defined(slug.current)  && !defined($search) || title match $search || categories->title match $search || author->name match $search] | order(title) {
  _id,
  title,
  slug,
  description,
  _createdAt,
  author -> {
    _id,
    name,
    image
  },
  views,
  body,
  "categories": categories[]->{
    _id,
    title,
    slug
  },
  "mainImageUrl": mainImage.asset->url,
  "mainImageAlt": mainImage.alt
}`)

export const BLOGS_VIEWS_QUERY = defineQuery(`*[_type == 'post' && _id == $id][0]{
  _id, views
}`)
