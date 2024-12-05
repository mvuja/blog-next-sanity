import BlogCard from '@/components/BlogCard'
import DropdownFilter from '@/components/DropdownFilter'
import SearchForm from '@/components/SearchForm'
import { sanityFetch, SanityLive } from '@/sanity/lib/live'
import { SORTED_BLOGS_BY_DATE_QUERY, SORTED_BLOGS_BY_TITLE_QUERY, BLOGS_SEARCH_QUERY } from '@/sanity/lib/queries'

const availableFilters = {
	name: SORTED_BLOGS_BY_TITLE_QUERY,
	date: SORTED_BLOGS_BY_DATE_QUERY,
	default: BLOGS_SEARCH_QUERY,
} as const

type FilterType = keyof typeof availableFilters

const Page = async ({ searchParams }: { searchParams: Promise<{ filter: string; query?: string }> }) => {
	const filter = ((await searchParams).filter as FilterType) || 'default'
	const query = (await searchParams).query

	const params = { search: query || null }

	// const posts = await client.fetch(availableFilters[filter])
	// LIVE FETCHING WITH SANITY
	const { data: posts } = await sanityFetch({ query: availableFilters[filter], params })

	return (
		<>
			<DropdownFilter />
			<SearchForm query={query} searchParams={searchParams} />
			<h1 className='text-3xl font-bold mt-10 mb-3'>{query ? `Search results for: ${query}` : 'All blogs'}</h1>
			<div className='grid grid-cols-3 gap-5'>
				{posts?.length > 0 ? posts.map((post: BlogCardType) => <BlogCard key={post?._id} post={post} />) : <p>No posts</p>}
			</div>
			<SanityLive />
		</>
	)
}

export default Page
