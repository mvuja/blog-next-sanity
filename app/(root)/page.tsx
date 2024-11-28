import BlogCard from '@/components/BlogCard'
import { client } from '@/sanity/lib/client'
import { BLOGS_QUERY } from '@/sanity/lib/queries'

export default async function Home() {
	const posts = await client.fetch(BLOGS_QUERY)

	return (
		<>
			<h1>Posts</h1>
			{posts?.length > 0 ? posts.map((post: BlogCardType, index: number) => <BlogCard key={post?._id} post={post} />) : <p>No posts</p>}
		</>
	)
}
