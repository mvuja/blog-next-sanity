import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { formatDate } from '@/lib/utils'
import Image from 'next/image'
import PostBody from './PostBody'
import Link from 'next/link'

const BlogCard = ({ post }: { post: BlogCardType }) => {
	const { _id, title, _createdAt, author, body, categories, mainImageUrl, mainImageAlt, slug } = post

	return (
		<Card>
			<CardHeader>
				<CardTitle>
					<Link href={`/blog/${slug.current}`}>
						<Image className='rounded-xl' src={mainImageUrl} alt={mainImageAlt} width={300} height={200} />
						<h3 className='text-xl mt-3'>{title}</h3>
					</Link>
				</CardTitle>
				<CardDescription>
					{categories.map((cat) => (
						<Badge variant='outline' key='cat'>
							{cat.title}
						</Badge>
					))}
				</CardDescription>
			</CardHeader>
			<CardContent>
				<PostBody body={body} />
			</CardContent>
			<CardFooter className='flex justify-between'>
				<p>{formatDate(_createdAt)}</p>
				<p>By: {author?.name}</p>
			</CardFooter>
		</Card>
	)
}

export default BlogCard
