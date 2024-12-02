import BlogCard from '@/components/BlogCard'
import DropdownFilter from '@/components/DropdownFilter'
import { client } from '@/sanity/lib/client'
import { SORTED_BLOGS_BY_DATE_QUERY, SORTED_BLOGS_BY_TITLE_QUERY, BLOGS_QUERY } from '@/sanity/lib/queries'

const availableFilters = {
	name: SORTED_BLOGS_BY_TITLE_QUERY,
	date: SORTED_BLOGS_BY_DATE_QUERY,
	default: BLOGS_QUERY,
} as const

type FilterType = keyof typeof availableFilters

const Page = async ({ searchParams }: { searchParams: { filter: string } }) => {
	const filter = (searchParams.filter as FilterType) || 'default'

	// Fetch posts based on the validated filter
	const posts = await client.fetch(availableFilters[filter])

	return (
		<>
			<DropdownFilter />
			<div className='grid grid-cols-3 gap-5'>
				{posts?.length > 0 ? posts.map((post: BlogCardType) => <BlogCard key={post?._id} post={post} />) : <p>No posts</p>}
			</div>
		</>
	)
}

export default Page
