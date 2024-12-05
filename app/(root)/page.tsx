import { auth } from '@/auth'
import BlogCard from '@/components/BlogCard'
import { sanityFetch, SanityLive } from '@/sanity/lib/live'
import { BLOGS_QUERY } from '@/sanity/lib/queries'

export default async function Home() {
	const { data: posts } = await sanityFetch({ query: BLOGS_QUERY })

	const session = await auth()

	return (
		<>
			<h1>Posts</h1>
			<div className='grid grid-cols-3 gap-5'>
				{posts?.length > 0 ? posts.map((post: BlogCardType) => <BlogCard key={post?._id} post={post} />) : <p>No posts</p>}
			</div>
			<SanityLive />
		</>
	)
}
