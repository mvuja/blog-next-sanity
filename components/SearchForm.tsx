import Form from 'next/form'
import SearchFormReset from './SearchFormReset'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'

const SearchForm = ({ query, otherParams }: { query?: string; otherParams?: string }) => {
	const actionUrl = `/blogs?${otherParams || ''}`

	return (
		<Form action={actionUrl} scroll={false} className='search-form'>
			<Input type='text' name='query' defaultValue={query} placeholder='Search Blogs' />

			<div>
				{query && <SearchFormReset />}
				<Button>S</Button>
			</div>
		</Form>
	)
}

export default SearchForm
