import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { formatDate } from '@/lib/utils'
import Image from 'next/image'
import Link from 'next/link'
import placeholder from '@/public/placeholder.jpg'

const BlogCard = ({ post }: { post: BlogCardType }) => {
	const { title, _createdAt, author, description, categories, mainImageUrl, mainImageAlt, slug } = post

	return (
		<Card>
			<CardHeader>
				<CardTitle>
					<div className='relative aspect-video'>
						<Link href={`/blog/${slug.current}`}>
							{mainImageUrl ? (
								<Image className='rounded-xl object-cover' src={mainImageUrl} alt={mainImageAlt} fill />
							) : (
								<Image className='rounded-xl object-cover' src={placeholder} alt='Image' fill />
							)}
						</Link>
					</div>
					<h3 className='text-xl mt-3'>
						<Link href={`/blog/${slug.current}`}>{title}</Link>
					</h3>
				</CardTitle>
				<CardDescription>
					<p>{formatDate(_createdAt)}</p>
				</CardDescription>
			</CardHeader>
			<CardContent className='pb-4'>
				<p className='line-clamp-4'>{description}</p>
			</CardContent>
			<CardFooter className='block pb-2'>
				<div className='mb-2'>
					{categories &&
						categories.map((cat: any) => (
							<Badge variant='outline' key={cat.title} className='mr-1'>
								{cat.title}
							</Badge>
						))}
				</div>

				{author && <p className='text-sm text-muted-foreground'>By: {author.name}</p>}
			</CardFooter>
		</Card>
	)
}

export default BlogCard
