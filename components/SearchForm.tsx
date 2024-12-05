import Form from 'next/form'
import SearchFormReset from './SearchFormReset'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'

const SearchForm = async ({ query, searchParams }: { query?: string; searchParams: Record<string, string> }) => {
	const params = new URLSearchParams(await searchParams)
	params.delete('query')
	const otherParams = Object.fromEntries(params.entries())

	return (
		<Form action='/blogs' scroll={false} className='search-form'>
			{/* Preserve other search parameters as hidden inputs */}
			{Object.entries(otherParams).map(([key, value]) => (
				<input type='hidden' key={key} name={key} value={value} />
			))}
			<Input type='text' name='query' defaultValue={query} placeholder='Search Blogs' />

			<div>
				{query && <SearchFormReset />}
				<Button>S</Button>
			</div>
		</Form>
	)
}

export default SearchForm
