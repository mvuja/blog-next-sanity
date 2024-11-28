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
    mainImage
}`)
