import { auth } from '@/auth'
import BlogCard from '@/components/BlogCard'
import { client } from '@/sanity/lib/client'
import { BLOGS_QUERY } from '@/sanity/lib/queries'

export default async function Home() {
	const posts = await client.fetch(BLOGS_QUERY)

	const session = await auth()

	return (
		<>
			<h1>Posts</h1>
			<div className='grid grid-cols-3 gap-5'>
				{posts?.length > 0 ? posts.map((post: BlogCardType) => <BlogCard key={post?._id} post={post} />) : <p>No posts</p>}
			</div>
		</>
	)
}
