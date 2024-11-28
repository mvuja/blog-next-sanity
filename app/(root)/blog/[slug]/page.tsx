import { Badge } from '@/components/ui/badge'
import { client } from '@/sanity/lib/client'
import { BLOG_BY_SLUG_QUERY } from '@/sanity/lib/queries'
import { notFound } from 'next/navigation'
import React from 'react'

const Page = async ({ params }: { params: Promise<{ slug: string }> }) => {
	const slug = (await params).slug

	console.log(slug)

	const post = await client.fetch(BLOG_BY_SLUG_QUERY, { slug })

	if (!post) return notFound()

	return (
		<>
			<h1 className='text-3xl'>{post.title}</h1>
			<div>
				{post.categories.map((cat) => (
					<Badge variant='outline' key='cat'>
						{cat.title}
					</Badge>
				))}
			</div>
		</>
	)
}

export default Page
