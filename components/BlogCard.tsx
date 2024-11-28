import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { formatDate } from '@/lib/utils'

const BlogCard = ({ post }: { post: BlogCardType }) => {
	const { _id, title, _createdAt, author, body, categories, mainImage } = post

	console.log(mainImage)

	return (
		<Card>
			<CardHeader>
				<CardTitle>{title}</CardTitle>
				<CardDescription>Categories: {categories.map((cat) => cat.title)}</CardDescription>
			</CardHeader>
			<CardContent>
				<p>Card Content</p>
			</CardContent>
			<CardFooter className='flex justify-between'>
				<p>{formatDate(_createdAt)}</p>
				<p>By: {author?.name}</p>
			</CardFooter>
		</Card>
	)
}

export default BlogCard
