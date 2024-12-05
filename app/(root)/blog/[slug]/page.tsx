import PostBody from '@/components/PostBody'
import { Badge } from '@/components/ui/badge'
import { client } from '@/sanity/lib/client'
import { BLOG_BY_SLUG_QUERY } from '@/sanity/lib/queries'
import Image from 'next/image'
import { notFound } from 'next/navigation'
import React from 'react'
import placeholder from '@/public/placeholder.jpg'
import { formatDate } from '@/lib/utils'

const Page = async ({ params }: { params: Promise<{ slug: string }> }) => {
	const slug = (await params).slug

	const post = await client.fetch(BLOG_BY_SLUG_QUERY, { slug })
	const { title, _createdAt, author, body, categories, mainImageUrl, mainImageAlt } = post

	if (!post) return notFound()

	return (
		<>
			<h1 className='text-5xl font-bold mb-2 pt-10'>{title}</h1>
			<div className='flex justify-between pb-7'>
				<p className='text-sm text-muted-foreground'>{formatDate(_createdAt)}</p>
				{author && <p className='text-sm text-muted-foreground'>By: {author.name}</p>}
			</div>
			<div className='relative aspect-video'>
				{mainImageUrl ? (
					<Image className='rounded-xl object-cover' src={mainImageUrl} alt={mainImageAlt} fill={true} quality={100} loading='eager' />
				) : (
					<Image className='rounded-xl object-cover' src={placeholder} alt='Image' fill={true} loading='eager' />
				)}
			</div>

			{categories && (
				<div className='pt-3'>
					{categories.map((cat: any) => (
						<Badge variant='outline' key={cat.title} className='mr-1'>
							{cat.title}
						</Badge>
					))}
				</div>
			)}

			<div className='mt-10'>
				<PostBody body={body} />
			</div>
		</>
	)
}

export default Page
